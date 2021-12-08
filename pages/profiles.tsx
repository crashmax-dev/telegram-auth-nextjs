import Layout from 'components/Layout'
import ListProfiles from 'components/ListProfiles'
import { connectToDatabase } from 'lib/mongodb'
import { withSessionSsr } from 'lib/iron-session'
import { getUsers, validateRole } from './api/users'
import { Roles } from 'models/user.document'
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
      await validateRole(Roles.root, session)
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
