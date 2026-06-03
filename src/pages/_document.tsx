import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const themeInitScript = `(function(){
  var t;
  try { t = localStorage.getItem('theme'); } catch(e) {}
  if (t !== 'light' && t !== 'dark') {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-bs-theme', t);
  if (t === 'dark') {
    var l = document.createElement('link');
    l.id = 'hljs-dark-theme';
    l.rel = 'stylesheet';
    l.href = '/hljs-dark.css';
    document.head.appendChild(l);
  }
})()`

export default function Document(): React.ReactElement {
  return (
    <Html lang='en' data-scroll-behavior='smooth'>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
