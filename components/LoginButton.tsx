import useUser from 'lib/use-user'
import TelegramLoginWidget from './TelegramLoginWidget'

export default function LoginButton() {
  const { user, onLogin } = useUser({
    redirectTo: '/profile-sg',
    redirectIfFound: true
  })

  if (process.env.NODE_ENV === 'development') {
    return (
      <button
        className="bg-telegram text-white py-2 px-4 rounded-full disabled:cursor-wait"
        onClick={(e) => {
          e.currentTarget.disabled = true
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
        Login with Telegram
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
