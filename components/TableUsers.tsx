import type { UserResponse } from 'types/user'

type Props = {
  users?: UserResponse[]
}

export default function TableUsers({ users }: Props) {
  if (!users) return null

  return (
    <div className="bg-gray-800 text-white overflow-auto rounded-md">
      <table className="table-auto">
        <thead>
          <tr className="uppercase">
            <th className="py-3 px-6 text-left">name</th>
            <th className="py-3 px-6 text-left">id</th>
            <th className="py-3 px-6 text-left">username</th>
            <th className="py-3 px-6 text-center">last seen</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((
            { id, username, first_name, last_name, photo_url, auth_date },
            key
          ) => {
            return (
              <tr key={key}>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <img
                        className="w-6 h-6 rounded-full bg-gray-300"
                        src={photo_url}
                        width={24}
                        height={24}
                        alt="User avatar"
                      />
                    </div>
                    <span>{first_name} {last_name || ''}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  {id}
                </td>
                <td className="py-3 px-6 text-center">
                  {username || ''}
                </td>
                <td className="py-3 px-6 text-center">
                  {new Date(auth_date * 1000).toUTCString()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
