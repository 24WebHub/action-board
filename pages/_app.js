import { SessionProvider } from "next-auth/react"
import { AppContextProvider } from '../context/AppContext'

import '../styles/globals.css'


export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <AppContextProvider>
      <Component {...pageProps} />
      </AppContextProvider>
      </SessionProvider>
  )
}
