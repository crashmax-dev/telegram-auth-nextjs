import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Next.js Telegram Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 gap-6">
        <Header />
        {children}
      </main>
      <Footer />
    </div>
  )
}
