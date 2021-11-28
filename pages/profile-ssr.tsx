import Link from 'components/Link'
import Layout from 'components/Layout'
import Profile from 'components/Profile'
import useUser from 'lib/use-user'
import { withSessionSsr } from 'lib/iron-session'
import type { InferGetServerSidePropsType } from 'next'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ProfileSsr({ user }: Props) {
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

export const getServerSideProps = withSessionSsr(
  async function useSSR({ req }) {
    const user = req.session.user

    if (user) {
      return {
        props: { user }
      }
    }

    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: {}
    }
  }
)
