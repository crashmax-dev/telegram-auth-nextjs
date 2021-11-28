import { Tier } from 'models/user.document'
import { JsonPreview } from './JsonPreview'
import type { LeanDocument } from 'mongoose'
import type { IUserModel, TiersType } from 'models/user.document'

type Props = {
  users: LeanDocument<IUserModel[]>
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
                <th className="py-3 px-4 text-left">type</th>
                <th className="py-3 px-4">last seen</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({
                id,
                type,
                username,
                first_name,
                last_name,
                photo_url,
                auth_date
              }, key
              ) => {
                return (
                  <tr key={key}>
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <div className="w-8 h-8 group rounded-full bg-light-gray overflow-hidden shadow-inner table">
                            {photo_url ?
                              <img
                                src={photo_url}
                                className="object-cover object-center"
                              /> :
                              <span className="text-center font-medium table-cell align-middle">
                                {first_name[0] + (last_name ? last_name[0] : '')}
                              </span>
                            }
                          </div>
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
                      <Badge type={type} />
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

function Badge({ type }: { type: TiersType }) {
  const colors = {
    [Tier.everyone]: 'bg-green-500',
    [Tier.regular]: 'bg-blue-500',
    [Tier.moderator]: 'bg-red-500'
  }

  return (
    <span className={[badgeClassNames, colors[type]].join(' ')}>
      {type}
    </span>
  )
}
