import useUser from 'lib/use-user'
import dynamic from 'next/dynamic'
import Layout from 'components/Layout'

const TelegramLoginWidget = dynamic(
  () => import('../components/TelegramLoginWidget'),
  { ssr: true }
)

export default function Home() {
  const { user, onLogin } = useUser({
    redirectTo: '/profile-sg',
    redirectIfFound: true
  })

  return (
    <Layout>
      {!user?.ok && (
        <TelegramLoginWidget
          botId={2107099955}
          usePic={true}
          requestAccess={false}
          dataOnauth={onLogin}
          botName={process.env.NEXT_PUBLIC_BOT_NAME}
        />
      )}
    </Layout>
  )
}
