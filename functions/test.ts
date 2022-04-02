/* global Response */

export const onRequestGet = async function (context) {
  const responseObject = {
    headers: context.request.headers,
    env: context.env
  }
  return new Response(JSON.stringify(responseObject), {
    status: 200,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
  })
}
