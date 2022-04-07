import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: '{sentry_dsn}',
  release: '{commit_hash}',
  environment: '{environment}',
  attachStacktrace: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
})

window.dataLayer = window.dataLayer || []
const gtag = function () {
  window.dataLayer.push(arguments)
}
gtag('js', new Date())
gtag('config', 'G-BQEXZJ8MM5')
