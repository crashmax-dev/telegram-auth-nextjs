import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import fetcher from 'lib/fetcher'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (err) => {
          console.error(err)
        }
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
