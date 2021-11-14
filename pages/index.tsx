import Head from 'next/head'
import useUser from 'lib/use-user'
import TelegramLoginButton from 'telegram-login-button'

export default function Home() {
  const { user, onLogin, onLogout } = useUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Next.js Telegram Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 gap-4">
        {!user?.isLoggedIn ? (
          <TelegramLoginButton
            usePic={true}
            requestAccess={false}
            dataOnauth={onLogin}
            botName="nextjs_bot"
          />
        ) : (
          <>
            <button onClick={onLogout} className="bg-telegram text-white py-2 px-4 rounded-full">
              Logout
            </button>
            <pre className="overflow-auto w-full border rounded-md p-4">
              {JSON.stringify(user, null, 2)}
            </pre>
          </>
        )}
      </main>
    </div>
  )
}
