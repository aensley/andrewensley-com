/* global Sentry */

Sentry.init({
  dsn: '{sentry_dsn}',
  release: '{commit_hash}',
  environment: '{environment}',
  attachStacktrace: true,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0
})
