import Router from 'next/router'
import UserAvatar from './UserAvatar'
import { JsonPreview } from './JsonPreview'
import type { User } from 'types/user'

type Props = {
  user?: User
  onLogout: () => void
}

export default function Profile({ user, onLogout }: Props) {
  if (!user) return null

  return (
    <>
      <div className="flex gap-2">
        <UserAvatar user={user} />
        <button
          onClick={onLogout}
          className="bg-telegram text-white py-2 px-4 rounded-full"
        >
          Logout
        </button>
        <button
          onClick={() => Router.push('/profile-ssr')}
          className="bg-telegram text-white py-2 px-4 rounded-full"
        >
          SSR
        </button>
        <button
          onClick={() => Router.push('/profile-sg')}
          className="bg-telegram text-white py-2 px-4 rounded-full"
        >
          SG
        </button>
      </div>
      <JsonPreview>{user}</JsonPreview>
    </>
  )
}
