import Layout from 'components/Layout'
import ListProfiles from 'components/ListProfiles'
import { connectToDatabase } from 'lib/mongodb'
import { withSessionSsr } from 'lib/iron-session'
import { getUsers, validateSession } from './api/users'
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
      await connectToDatabase()
      await validateSession(session)
      const users = await getUsers()

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
          destination: '/profile-sg'
        },
        props: {
          user: []
        }
      }
    }
  }
)
