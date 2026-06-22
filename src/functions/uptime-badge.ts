/* global Response, fetch -- Cloudflare Workers globals not available in the DOM lib */

interface CloudflareKV {
  get: (key: string) => Promise<string>
}

interface CloudflareEnv {
  default: CloudflareKV
}

interface CloudflareContext {
  env: CloudflareEnv
}

const HTTP_OK = 200
const HTTP_REDIRECT = 302
const UPTIME_EXCELLENT = 98.0
const UPTIME_GOOD = 95.0
const UPTIME_FAIR = 90.0
const UPTIME_POOR = 85.0
const UPTIME_BAD = 80.0

function getUptimeColor(uptime: number): string {
  if (uptime >= UPTIME_EXCELLENT) return 'brightgreen'
  if (uptime >= UPTIME_GOOD) return 'green'
  if (uptime >= UPTIME_FAIR) return 'yellowgreen'
  if (uptime >= UPTIME_POOR) return 'yellow'
  if (uptime >= UPTIME_BAD) return 'orange'
  return 'red'
}

export const onRequestGet = async function (context: CloudflareContext): Promise<Response> {
  let uptimeString = 'unknown'
  let color = 'lightgray'
  try {
    const pageId = await context.env.default.get('STATUSPAGE_PAGE_ID')
    const componentId = await context.env.default.get('STATUSPAGE_COMPONENT_ID')
    const apiKey = await context.env.default.get('STATUSPAGE_API_KEY')
    const uptimeResponse = await fetch(
      // https://developer.statuspage.io/#operation/getPagesPageIdComponentsComponentIdUptime
      `https://api.statuspage.io/v1/pages/${pageId}/components/${componentId}/uptime`,
      {
        headers: { Authorization: `OAuth ${apiKey}` },
        method: 'GET'
      }
    )

    if (uptimeResponse.status === HTTP_OK) {
      const json: unknown = await uptimeResponse.json()
      if (typeof json === 'object' && json !== null && 'uptime_percentage' in json) {
        const { uptime_percentage: uptime } = json
        if (typeof uptime === 'number') {
          uptimeString = `${uptime}%25`
          color = getUptimeColor(uptime)
        }
      }
    }
  } catch (e) {}

  return new Response('', {
    status: HTTP_REDIRECT,
    headers: {
      // https://shields.io/#your-badge
      Location: `https://img.shields.io/badge/uptime-${uptimeString}-${color}?style=flat-square&logo=statuspage`
    }
  })
}
