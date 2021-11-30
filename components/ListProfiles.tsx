import { useState } from 'react'
import UserAvatar from './UserAvatar'
import JsonPreview from './JsonPreview'
import { useUser } from 'context/use-user'
import { Roles } from 'models/user.document'
import type { UserData, RolesType } from 'models/user.document'

type Props = {
  users: UserData[]
}

export default function ListProfiles({ users }: Props) {
  const { user: _user } = useUser()

  return (
    <>
      <div className="w-full max-w-5xl bg-gray text-white rounded-md shadow-lg">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="uppercase">
                <th className="py-3 px-4 text-left">name</th>
                <th className="py-3 px-4 text-left">id</th>
                <th className="py-3 px-4 text-left">username</th>
                <th className="py-3 px-4">role</th>
                <th className="py-3 px-4">last seen</th>
                {/* <th className="py-3 px-4">actions</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => {
                const {
                  id,
                  role,
                  username,
                  first_name,
                  last_name,
                  auth_date,
                } = user

                return (
                  <tr key={key}>
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <UserAvatar user={user} />
                        </div>
                        <span>{first_name} {last_name || ''}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {id}
                    </td>
                    <td className="py-3 px-4">
                      <UsernameLink username={username} />
                    </td>
                    <td className="py-3 px-4">
                      {_user!.id !== id ?
                        <UserRole id={id} role={role} /> :
                        <span className="w-full inline-flex items-center justify-center uppercase px-2 py-1 text-xs font-bold leading-none rounded bg-red-500">
                          {role}
                        </span>
                      }
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(auth_date * 1000).toUTCString()}
                    </td>
                    {/* <td className="py-3 px-4 text-center">
                      <button className="bg-green-500 h-8 text-white px-4 rounded-md">
                        Edit
                      </button>
                    </td> */}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <JsonPreview>{users}</JsonPreview>
    </>
  )
}

function UsernameLink({ username }: { username?: string }) {
  if (username) {
    return (
      <a
        className="hover:underline"
        href={`https://t.me/${username}`}
        target="_blank"
      >
        {username}
      </a>
    )
  } else {
    return (
      <span className={["inline-flex items-center justify-center uppercase px-2 py-1 text-xs font-bold leading-none rounded", 'bg-red-500'].join(' ')}>
        not used
      </span>
    )
  }
}

function UserRole(props: { id: number, role: RolesType }) {
  const [userRole, setUserRole] = useState(props.role)
  const [isLoading, setIsLoading] = useState(false)

  const colors = {
    [Roles.user]: 'bg-green-500',
    [Roles.owner]: 'bg-blue-500',
    [Roles.root]: 'bg-red-500'
  }

  const updateUserRole = async (id: number, role: RolesType) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role })
      })

      const data = await response.json()
      if (data.ok) {
        setUserRole(role)
      }
    } catch (err) {
      console.error(err)
      setUserRole(userRole)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <select
      disabled={isLoading}
      defaultValue={userRole}
      onChange={e => updateUserRole(props.id, e.currentTarget.value as RolesType)}
      className={['w-full uppercase px-2 py-1 text-xs text-center font-bold leading-none appearance-none rounded outline-none cursor-pointer', colors[userRole]].join(' ')}
    >
      <option className="bg-gray" value={Roles.user}>{Roles.user}</option>
      <option className="bg-gray" value={Roles.owner}>{Roles.owner}</option>
      <option className="bg-gray" value={Roles.root}>{Roles.root}</option>
    </select>
  )
}
