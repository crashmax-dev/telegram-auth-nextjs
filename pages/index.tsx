import useUser from 'lib/use-user'
import TelegramLoginWidget from 'components/TelegramLoginWidget'
import Layout from 'components/Layout'

export default function Home() {
  const { user, onLogin } = useUser({
    redirectTo: '/profile-sg',
    redirectIfFound: true
  })

  return (
    <Layout>
      {!user?.isLoggedIn && (
        <TelegramLoginWidget
          usePic={true}
          requestAccess={false}
          dataOnauth={onLogin}
          botName={process.env.NEXT_PUBLIC_BOT_NAME}
        />
      )}
    </Layout>
  )
}
