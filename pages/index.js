import Head from 'next/head'
import { useState } from 'react'
import TelegramLoginButton from 'react-telegram-login'

export default function Home() {
  const [response, setResponse] = useState(null)

  const handleTelegramResponse = async (data) => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const body = await response.json()
    setResponse(body)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Next.js Telegram Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 gap-4">
        <TelegramLoginButton
          dataOnauth={handleTelegramResponse}
          botName="nextjs_bot"
        />
        {response &&
          <pre class="w-full border rounded-md p-4">
            {JSON.stringify(response, null, 2)}
          </pre>
        }
      </main>
    </div>
  )
}
