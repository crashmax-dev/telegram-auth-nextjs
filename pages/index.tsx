import dynamic from 'next/dynamic'
import Layout from 'components/Layout'

const LoginButton = dynamic(
  () => import('../components/LoginButton'),
  { ssr: true }
)

export default function Home() {
  return (
    <Layout>
      <LoginButton />
    </Layout >
  )
}
