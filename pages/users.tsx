import Router from 'next/router'
import Layout from 'components/Layout'
import TableUsers from 'components/TableUsers'
import fetcher from 'lib/fetcher'
import { useEffect, useState } from 'react'
import type { UserResponse } from 'types/user'

export default function Users() {
  const [users, setUsers] = useState<UserResponse[]>()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetcher<{ users: UserResponse[] }>('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      setUsers(response.users)
    } else {
      Router.push('/')
    }
  }

  return (
    <Layout>
      <TableUsers users={users} />
    </Layout>
  )
}
