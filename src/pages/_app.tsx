import React from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import 'highlight.js/styles/github.css'

export default function App({ Component, pageProps }: AppProps): React.JSX.Element {
  return <Component {...pageProps} />
}
