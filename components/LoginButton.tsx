import { useEffect, useState } from 'react'
import { useUser } from 'context/use-user'
import { TelegramIco, LoadingIco } from './Icons'
import TelegramLoginWidget from './TelegramLoginWidget'

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { user, onLogin, setRedirect } = useUser()

  useEffect(() => {
    setRedirect({
      redirectTo: '/profile-sg',
      redirectIfFound: true
    })
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return (
      <button
        disabled={isLoading}
        className="bg-telegram text-white py-2 px-4 rounded-full"
        onClick={() => {
          setIsLoading(true)
          onLogin({
            id: 216972324,
            username: "crashmax",
            first_name: "Vitalij",
            last_name: "Ryndin",
            photo_url: "https://t.me/i/userpic/320/P3CGN4q_l5jqPbP5lctVKmcti38Q6inTB3e9gDbcCN4.jpg",
            hash: process.env.NEXT_PUBLIC_DEV_HASH,
            auth_date: 1638131757
          })
        }}
      >
        {isLoading ? <LoadingIco /> : <TelegramIco />}
        Log in with Telegram (dev)
      </button>
    )
  } else if (!user?.ok) {
    return (
      <TelegramLoginWidget
        onLogin={onLogin}
        requestAccess={false}
        botId={process.env.NEXT_PUBLIC_BOT_ID}
      />
    )
  } else {
    return null
  }
}
