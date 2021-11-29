import { Roles } from 'models/user.document'
import UserAvatar from './UserAvatar'
import JsonPreview from './JsonPreview'
import type { LeanDocument } from 'mongoose'
import type { UserModel, RolesType } from 'models/user.document'

type Props = {
  users: LeanDocument<UserModel[]>
}

export default function TableProfiles({ users }: Props) {
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
                <th className="py-3 px-4 text-left">role</th>
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
                  auth_date
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
                      <Badge role={role} />
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
      <JsonPreview>{users}</JsonPreview>
    </>
  )
}

const badgeClassNames = "inline-flex items-center justify-center uppercase px-2 py-1 text-xs font-bold leading-none rounded"

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
      <span className={[badgeClassNames, 'bg-red-500'].join(' ')}>
        not used
      </span>
    )
  }
}

function Badge({ role }: { role: RolesType }) {
  const colors = {
    [Roles.user]: 'bg-green-500',
    [Roles.owner]: 'bg-blue-500',
    [Roles.root]: 'bg-red-500'
  }

  return (
    <span className={[badgeClassNames, colors[role]].join(' ')}>
      {role}
    </span>
  )
}
