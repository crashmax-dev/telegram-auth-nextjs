import Link from 'components/Link'
import Layout from 'components/Layout'
import Profile from 'components/Profile'
import useUser from 'lib/use-user'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import type { User } from 'pages/api/user'
import type { InferGetServerSidePropsType } from 'next'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function SSRProfile({ user }: Props) {
  const { onLogout } = useUser()

  return (
    <Layout>
      <p className="mt-3 text-2xl text-center">
        This page uses{" "}
        <Link href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">
          Server-side Rendering (SSR)
        </Link>{" "}
        and{" "}
        <Link href="https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering">
          getServerSideProps
        </Link>
      </p>
      <Profile user={user} onLogout={onLogout} />
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req, res, }) => {
  const user = req.session.user

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: {
        user: { isLoggedIn: false } as User
      }
    }
  }

  return {
    props: { user }
  }
}, sessionOptions)