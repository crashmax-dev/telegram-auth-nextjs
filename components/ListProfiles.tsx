import { useState } from 'react'
import UserAvatar from './UserAvatar'
import { useUser } from 'context/use-user'
import { Roles } from 'models/user.document'
import toast, { Toaster } from 'react-hot-toast'
import type { UserData, RolesType } from 'models/user.document'
import fetcher from 'lib/fetcher'

type Props = {
  users: UserData[]
}

export default function ListProfiles({ users }: Props) {
  const { user: _user } = useUser()

  return (
    <div className="w-full max-w-5xl bg-gray text-white rounded-md shadow-lg">
      <Toaster />
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="uppercase">
              <th className="py-3 px-4 text-left">name</th>
              <th className="py-3 px-4 text-left">id</th>
              <th className="py-3 px-4 text-left">username</th>
              <th className="py-3 px-4">role</th>
              <th className="py-3 px-4">last seen</th>
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
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
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
  const [isDisabled, setIsDisabled] = useState(false)

  const colors = {
    [Roles.user]: 'bg-green-500',
    [Roles.owner]: 'bg-blue-500',
    [Roles.root]: 'bg-red-500'
  }

  const updateUserRole = async (id: number, role: RolesType) => {
    try {
      setIsDisabled(true)
      toast.promise(
        fetcher('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, role })
        }),
        {
          loading: 'Loading...',
          error: (err) => `This just happened: ${err.data.message}`,
          success: () => {
            setUserRole(role)
            return `Successfully saved`
          }
        },
        {
          style: {
            color: '#FFFFFF',
            background: '#1E1E1E',
            minWidth: '250px'
          },
          success: {
            duration: 5000
          }
        }
      )
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <select
      disabled={isDisabled}
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
