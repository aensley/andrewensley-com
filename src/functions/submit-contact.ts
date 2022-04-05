/* global Response, fetch */

import { captureError } from '@cfworker/sentry'

/**
 * Handle the POST method.
 *
 * @param context The request context.
 * @returns Response object.
 */
export const onRequestPost = async function (context) {
  try {
    const headers = context.request.headers
    const input = convertFormDataToJson(await context.request.formData())
    const requestDetails = {
      name: input.name,
      email: input.email,
      message: input.message,
      userAgent: headers.get('user-agent'),
      userCountry: headers.get('cf-ipcountry'),
      userLanguage: headers.get('accept-language'),
      userIp: headers.get('cf-connecting-ip'),
      cfRay: headers.get('cf-ray'),
      referer: headers.get('referer'),
      environment: headers.get('host')
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
      await context.env.default.get('SENTRY_DSN'),
      '{environment}',
      '{package_name}@{commit_hash}',
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
const convertFormDataToJson = function (formData) {
  const output = {
    name: '',
    email: '',
    message: ''
  }
  for (const [key, value] of formData) {
    output[key] = value
  }

  return output
}

/**
 * Checks if the contact form submission is spam using Akismet's API.
 *
 * @param requestDetails JSON object containing all necessary request details.
 * @param context        The request context.
 * @returns Boolean true or false whether the submission is spam or not.
 */
const checkSpam = async function (requestDetails, context) {
  const url = 'https://andrewensley.com'
  const comment = {
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
    const spamResponse = await fetch(
      'https://' + (await context.env.default.get('AKISMET_KEY')) + '.rest.akismet.com/1.1/comment-check',
      {
        body: Object.keys(comment)
          .map((key) => key + '=' + comment[key])
          .join('&'),
        headers: {
          'User-Agent': 'TypeScript-CheckSpam/1.0 | Akismet/1.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      }
    )
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
const sendEmail = async function (requestDetails, context) {
  const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: await context.env.default.get('EMAIL'),
              name: 'Andrew Ensley'
            }
          ],
          dynamic_template_data: requestDetails
        }
      ],
      template_id: await context.env.default.get('SENDGRID_TEMPLATE_ID'),
      from: {
        email: await context.env.default.get('EMAIL'),
        name: requestDetails.name
      }
    }),
    headers: {
      Authorization: 'Bearer ' + (await context.env.default.get('SENDGRID_API_KEY')),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  return emailResponse
}
