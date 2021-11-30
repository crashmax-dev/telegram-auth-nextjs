import { getUsers } from './api/users'
import Layout from 'components/Layout'
import ListProfiles from 'components/ListProfiles'
import { withSessionSsr } from 'lib/iron-session'
import type { InferGetServerSidePropsType } from 'next'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Profiles({ users }: Props) {
  return (
    <Layout>
      <ListProfiles users={users} />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
  async function useSSR({ req }) {
    try {
      const session = req.session.user
      const users = await getUsers(session)

      return {
        props: {
          users,
          fallback: {
            '/api/auth/session': session
          }
        }
      }
    } catch (_) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        },
        props: {
          user: []
        }
      }
    }
  }
)
