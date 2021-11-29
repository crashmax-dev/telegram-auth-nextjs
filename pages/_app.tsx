import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { UserProvider } from 'context/user-user'
import fetcher from 'lib/fetcher'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import 'tailwindcss/tailwind.css'

const progress = new ProgressBar({
  className: 'bg-telegram',
  delay: 80,
  size: 2
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function App({ Component, pageProps }: AppProps) {
  const { fallback = {} } = pageProps

  return (
    <SWRConfig
      value={{
        fallback,
        fetcher,
        onError: (err) => {
          console.error(err)
        }
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SWRConfig>
  )
}
