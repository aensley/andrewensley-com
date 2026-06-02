import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import 'highlight.js/styles/github-dark-dimmed.css'

export default function App ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
