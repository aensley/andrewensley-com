import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const themeInitScript = `(function(){
  var t;
  try { t = localStorage.getItem('theme'); } catch(e) {}
  if (t !== 'light' && t !== 'dark') {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-bs-theme', t);
})()`

export default function Document(): React.ReactElement {
  return (
    <Html lang='en' data-scroll-behavior='smooth'>
      <Head>
        <link rel='icon' type='image/svg+xml' href='/icon.svg' />
        <link rel='icon' type='image/png' href='/icon.png' sizes='96x96' />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' sizes='16x16 32x32 48x48' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
