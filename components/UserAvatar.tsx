import type { User } from 'types/user'

type Props = {
  user: User
}

export default function UserAvatar({ user }: Props) {
  const { photo_url, first_name, last_name } = user

  return (
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
  )
}
