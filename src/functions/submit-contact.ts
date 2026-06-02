/* global Response, fetch -- Cloudflare Workers globals not available in the DOM lib */

import { captureError } from '@cfworker/sentry'

interface CloudflareKV {
  get: (key: string) => Promise<string>
}

interface CloudflareEnv {
  default: CloudflareKV
}

interface CloudflareContext {
  request: Request & { waitUntil: (promise: Promise<unknown>) => void }
  env: CloudflareEnv
}

interface RequestDetails {
  name: string
  email: string
  message: string
  userAgent: string | null
  userCountry: string | null
  userLanguage: string | null
  userIp: string | null
  cfRay: string | null
  referer: string | null
  environment: string | null
  version: string
}

const HTTP_BAD_REQUEST = 400
const HTTP_ACCEPTED = 202
const HTTP_INTERNAL_ERROR = 500
const HTTP_OK = 200

/**
 * Handle the POST method.
 *
 * @param context The request context.
 * @returns Response object.
 */
export const onRequestPost = async function (context: CloudflareContext): Promise<Response> {
  const { request } = context
  try {
    const { headers } = request
    const input = convertFormDataToJson(await request.formData())
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
      return new Response('Bad Request', { status: HTTP_BAD_REQUEST })
    }

    const emailResponse = await sendEmail(requestDetails, context)
    let output = ''
    let returnStatus = HTTP_OK
    if (emailResponse.status === HTTP_ACCEPTED) {
      output = 'Email Sent'
    } else {
      output = emailResponse.statusText + (await emailResponse.text())
      returnStatus = HTTP_INTERNAL_ERROR
    }

    return new Response(output, { status: returnStatus })
  } catch (err) {
    const { event_id: eventId, posted } = captureError(
      '{sentry_dsn}',
      '{environment}',
      '{commit_hash}',
      err,
      request,
      ''
    )
    request.waitUntil(posted)
    return new Response(`Internal server error. Event ID: ${eventId}`, { status: HTTP_INTERNAL_ERROR })
  }
}

/**
 * Parses a FormData Object into a JSON object.
 *
 * @param formData A FormData object (array of arrays)
 * @returns JSON object
 */
const convertFormDataToJson = function (formData: FormData): { name: string; email: string; message: string } {
  const output = {
    name: '',
    email: '',
    message: ''
  }
  for (const [key, value] of formData) {
    if (key === 'name' || key === 'email' || key === 'message') {
      output[key] = typeof value === 'string' ? value : ''
    }
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
const checkSpam = async function (requestDetails: RequestDetails, context: CloudflareContext): Promise<boolean> {
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
    const akismetKey = await context.env.default.get('AKISMET_KEY')
    const spamResponse = await fetch(`https://${akismetKey}.rest.akismet.com/1.1/comment-check`, {
      body: Object.entries(comment)
        .map(([key, value]) => `${key}=${value ?? ''}`)
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
const sendEmail = async function (requestDetails: RequestDetails, context: CloudflareContext): Promise<Response> {
  const toEmail = await context.env.default.get('EMAIL')
  const templateId = await context.env.default.get('SENDGRID_TEMPLATE_ID')
  const fromEmail = await context.env.default.get('EMAIL')
  const apiKey = await context.env.default.get('SENDGRID_API_KEY')
  const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: toEmail,
              name: 'Andrew Ensley'
            }
          ],
          dynamic_template_data: requestDetails
        }
      ],
      template_id: templateId,
      from: {
        email: fromEmail,
        name: requestDetails.name
      }
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  return emailResponse
}
