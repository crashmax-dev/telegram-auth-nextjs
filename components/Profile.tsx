import Router from 'next/router'
import UserAvatar from './UserAvatar'
import JsonPreview from './JsonPreview'
import { useUser } from 'context/use-user'
import type { UserResponse } from 'types/user'

type Props = {
  user?: UserResponse
  onLogout?: () => void
}

export default function Profile({ user, onLogout }: Props) {
  const { onLogout: _onLogout } = useUser()

  if (!user?.ok) return null

  return (
    <>
      <div className="flex gap-2">
        <UserAvatar user={user} />
        <button
          onClick={onLogout || _onLogout}
          className="bg-telegram text-white py-2 px-4 rounded-full"
        >
          Logout
        </button>
        <button
          onClick={() => Router.push('/profiles')}
          className="bg-telegram text-white py-2 px-4 rounded-full"
        >
          Profiles
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
