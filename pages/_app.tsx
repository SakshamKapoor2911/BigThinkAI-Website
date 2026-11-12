import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../src/styles/globals.css'
import { josefin, oswald, jetbrainsMono } from '../src/fonts'

export default function MyApp({ Component, pageProps }: AppProps) {
  // Expose the font CSS variables (--font-display, --font-label, --font-mono)
  const fonts = `${josefin.variable} ${oswald.variable} ${jetbrainsMono.variable}`
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08090B" />
      </Head>
      <div className={fonts}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
