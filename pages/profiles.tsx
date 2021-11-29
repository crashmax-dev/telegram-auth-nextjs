import mongodb from 'lib/mongodb'
import UserModel from 'models/user.model'
import { Roles } from 'models/user.document'
import Layout from 'components/Layout'
import TableProfiles from 'components/TableProfiles'
import { withSessionSsr } from 'lib/iron-session'
import type { InferGetServerSidePropsType } from 'next'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Profiles({ users }: Props) {
  return (
    <Layout>
      <TableProfiles users={users} />
    </Layout>
  )
}

export const getServerSideProps = withSessionSsr(
  async function useSSR({ req }) {
    const user = req.session.user

    if (user) {
      await mongodb()

      const userRole = await UserModel
        .findOne({ id: user.id })
        .select('role')

      if (Roles.root === userRole?.role) {
        const users = await UserModel
          .find()
          .select('-_id')
          .lean()

        return {
          props: { users }
        }
      }
    }

    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: { user: [] }
    }
  }
)
