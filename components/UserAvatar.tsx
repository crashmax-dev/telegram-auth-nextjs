import type { User } from 'types/user'

type Props = {
  user: User
}

export default function UserAvatar({ user }: Props) {
  const { photo_url, first_name, last_name } = user

  return (
    <div className="w-10 h-10 group rounded-full bg-light-gray overflow-hidden shadow-inner table">
      {photo_url ?
        <img
          src={photo_url}
          className="object-cover object-center"
        /> :
        <span className="text-center text-white font-medium table-cell align-middle">
          {first_name && last_name ?
            first_name.charAt(0) + last_name.charAt(0) :
            first_name.charAt(0)
          }
        </span>
      }
    </div>
  )
}
