import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { DataContext, useRendering } from "../utils/hooks/appContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataContext.Provider value={useRendering()}>
      <Component {...pageProps} />
    </DataContext.Provider>
  )
}

export default MyApp
