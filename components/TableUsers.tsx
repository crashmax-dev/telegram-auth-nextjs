import type { UserResponse } from 'types/user'

type Props = {
  users?: UserResponse[]
}

export default function TableUsers({ users }: Props) {
  if (!users) return null

  return (
    <>
      <div className="w-full max-w-5xl bg-gray-800 text-white rounded-md shadow-lg">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="uppercase">
                <th className="py-3 px-4 text-left">name</th>
                <th className="py-3 px-4 text-left">id</th>
                <th className="py-3 px-4 text-left">username</th>
                <th className="py-3 px-4">last seen</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((
                { id, username, first_name, last_name, photo_url, auth_date },
                key
              ) => {
                return (
                  <tr key={key}>
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center">
                        <div className="w-10">
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
                    <td className="py-3 px-4">
                      {id}
                    </td>
                    <td className="py-3 px-4">
                      {username || ''}
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
      <pre className="max-w-5xl bg-gray-800 border-gray-700 text-white shadow-lg overflow-auto w-full rounded-md p-4">
        {JSON.stringify(users, null, 2)}
      </pre>
    </>
  )
}
