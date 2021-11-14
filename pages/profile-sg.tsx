import Link from 'components/Link'
import Layout from 'components/Layout'
import Profile from 'components/Profile'
import useUser from 'lib/use-user'

export default function UserSG() {
  const { user, onLogout } = useUser({
    redirectTo: '/'
  })

  return (
    <Layout>
      <p className="mt-3 text-2xl text-center">
        This page uses{" "}
        <Link href="https://nextjs.org/docs/basic-features/pages#static-generation-recommended" >
          Static Generation (SG)
        </Link>{" "}
        and the <Link href="/api/user">/api/user</Link> route (using{" "}
        <Link href="https://github.com/vercel/swr">
          vercel/SWR
        </Link>)
      </p>
      <Profile user={user} onLogout={onLogout} />
    </Layout>
  )
}
