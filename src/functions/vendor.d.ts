declare module '@cfworker/sentry' {
  export function captureError(
    ...args: [dsn: string, environment: string, release: string, err: unknown, request: Request, extra: string]
  ): { event_id: string; posted: Promise<Response> }
}
