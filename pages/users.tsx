import Router from 'next/router'
import useUser from 'lib/use-user'
import Layout from 'components/Layout'
import TableUsers from 'components/TableUsers'
import fetcher from 'lib/fetcher'
import { STAFF_USER_ID } from 'lib/consts'
import { useEffect, useState } from 'react'
import type { UserResponse } from 'types/user'

export default function Users() {
  const [users, setUsers] = useState<UserResponse[]>()
  const { user } = useUser()

  useEffect(() => {
    if (user?.id === STAFF_USER_ID) {
      fetchUsers()
    } else {
      Router.push('/')
    }
  }, [])

  const fetchUsers = async () => {
    const response = await fetcher<{ users: UserResponse[] }>('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })

    setUsers(response.users)
  }

  return (
    <Layout>
      <TableUsers users={users} />
    </Layout>
  )
}
