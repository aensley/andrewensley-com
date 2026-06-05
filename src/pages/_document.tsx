import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const themeInitScript = `(function(){
  var t;
  try { t = localStorage.getItem('theme'); } catch(e) {}
  if (t !== 'light' && t !== 'dark') {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-bs-theme', t);
  var l = document.createElement('link');
  l.id = 'hljs-theme';
  l.rel = 'stylesheet';
  l.href = t === 'dark' ? '/hljs-dark.css' : '/hljs-light.css';
  document.head.appendChild(l);
})()`

export default function Document(): React.ReactElement {
  return (
    <Html lang='en' data-scroll-behavior='smooth'>
      <Head>
        <link rel='icon' type='image/svg+xml' href='/icon.svg' />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' sizes='16x16 32x32 48x48' />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
