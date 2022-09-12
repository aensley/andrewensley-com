/* global Response, fetch */

import { captureError } from '@cfworker/sentry'

interface RequestDetails {
  name: string
  email: string
  message: string
  userAgent: string
  userCountry: string
  userLanguage: string
  userIp: string
  cfRay: string
  referer: string
  environment: string
  version: string
}

interface Comment {
  user_ip: string
  user_agent: string
  referrer: string
  permalink: string
  blog: string
  blog_lang: string
  blog_charset: string
  comment_type: string
  comment_author: string
  comment_author_email: string
  comment_author_url: string
  comment_content: string
}

interface FormInputs {
  name: string
  email: string
  message: string
}

/**
 * Handle the POST method.
 *
 * @param context The request context.
 * @returns Response object.
 */
export const onRequestPost = async function (context: any) {
  try {
    const headers = context.request.headers
    const input = convertFormDataToJson(await context.request.formData())
    const requestDetails: RequestDetails = {
      name: input.name,
      email: input.email,
      message: input.message,
      userAgent: headers.get('user-agent'),
      userCountry: headers.get('cf-ipcountry'),
      userLanguage: headers.get('accept-language'),
      userIp: headers.get('cf-connecting-ip'),
      cfRay: headers.get('cf-ray'),
      referer: headers.get('referer'),
      environment: headers.get('host'),
      version: '{commit_hash}'
    }

    // Check for spam.
    const isSpam = await checkSpam(requestDetails, context)
    if (isSpam) {
      return new Response('Bad Request', { status: 400 })
    }

    const emailResponse = await sendEmail(requestDetails, context)
    let output
    let returnStatus = 200
    if (emailResponse.status === 202) {
      output = 'Email Sent'
    } else {
      output = emailResponse.statusText + (await emailResponse.text())
      returnStatus = 500
    }

    return new Response(output, { status: returnStatus })
  } catch (err) {
    /* eslint-disable camelcase */
    const { event_id, posted } = captureError(
      '{sentry_dsn}',
      '{environment}',
      '{commit_hash}',
      err,
      context.request,
      ''
    )
    context.request.waitUntil(posted)
    return new Response('Internal server error. Event ID: ' + event_id, { status: 500 })
    /* eslint-enable camelcase */
  }
}

/**
 * Parses a FormData Object into a JSON object.
 *
 * @param formData A FormData object (array of arrays)
 * @returns JSON object
 */
const convertFormDataToJson = function (formData: FormData) {
  const output: FormInputs = {
    name: '',
    email: '',
    message: ''
  }
  formData.forEach((value: FormDataEntryValue, key: any) => {
    if (Object.prototype.hasOwnProperty.call(output, key)) {
      output[key as keyof FormInputs] = value.toString()
    }
  })

  return output
}

/**
 * Checks if the contact form submission is spam using Akismet's API.
 *
 * @param requestDetails Object containing all necessary request details.
 * @param context        The request context.
 * @returns Boolean true or false whether the submission is spam or not.
 */
const checkSpam = async function (requestDetails: RequestDetails, context: any) {
  const url = 'https://andrewensley.com'
  const apiKey = await context.env.default.get('AKISMET_KEY')
  const comment: Comment = {
    user_ip: requestDetails.userIp,
    user_agent: requestDetails.userAgent,
    referrer: requestDetails.referer,
    permalink: url,
    blog: url,
    blog_lang: 'en_us',
    blog_charset: 'utf-8',
    comment_type: 'contact-form',
    comment_author: requestDetails.name,
    comment_author_email: requestDetails.email,
    comment_author_url: '',
    comment_content: requestDetails.message
  }

  try {
    const spamResponse = await fetch(`https://${apiKey}.rest.akismet.com/1.1/comment-check`, {
      body: Object.keys(comment)
        .map((key) => key + '=' + comment[key as keyof Comment])
        .join('&'),
      headers: {
        'User-Agent': 'TypeScript-CheckSpam/1.0 | Akismet/1.1',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })
    return (await spamResponse.text()) === 'true'
  } catch (err) {
    return false
  }
}

/**
 * Sends an email via SendGrid.
 *
 * @param requestDetails JSON object containing all necessary request details.
 * @param context        The request context.
 * @returns Response object.
 */
const sendEmail = async function (requestDetails: RequestDetails, context: any) {
  const email = await context.env.default.get('EMAIL')
  const templateId = await context.env.default.get('SENDGRID_TEMPLATE_ID')
  const apiKey = await context.env.default.get('SENDGRID_API_KEY')
  const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: email,
              name: 'Andrew Ensley'
            }
          ],
          dynamic_template_data: requestDetails
        }
      ],
      template_id: templateId,
      from: {
        email: email,
        name: requestDetails.name
      }
    }),
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  return emailResponse
}
