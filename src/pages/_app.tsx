/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import 'antd/dist/antd.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AnimatePresence exitBeforeEnter>
        <ThemeProvider defaultTheme="dark">
          <Component {...pageProps} />
        </ThemeProvider>
      </AnimatePresence>
    </SessionProvider>
  )
}

export default MyApp
