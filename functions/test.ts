/* global Response */

export const onRequestGet = async function (context) {
  const responseObject = {
    env: await context.env.default.get('EMAIL'),
    ip: context.request.headers.get('cf-connecting-ip')
  }
  return new Response(JSON.stringify(responseObject), {
    status: 200,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
  })
}
