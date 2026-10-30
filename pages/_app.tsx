import type { AppProps } from 'next/app'
import '../src/styles/globals.css'
import '../src/styles/studio.css'
import { inter, newsreader, jetbrainsMono } from '../src/fonts'

export default function MyApp({ Component, pageProps }: AppProps) {
  // Combine font classes to apply the CSS variables (e.g., --font-sans)
  const fonts = `${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`
  return (
    <div className={fonts}>
      <Component {...pageProps} />
    </div>
  )
}
