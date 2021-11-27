import Image from 'next/image'
import Router from 'next/router'
import type { UserResponse } from 'types/user'

type Props = {
  user?: UserResponse
  onLogout: () => void
}

export default function Profile({ user, onLogout }: Props) {
  if (!user) return null

  return (
    <>
      <div className="flex gap-2">
        {user.photo_url && (
          <Image
            className="inline object-cover w-8 h-8 rounded-full"
            src={user.photo_url}
            width={40}
            height={40}
            alt="User avatar"
          />
        )}
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
      <pre className="bg-gray-800 border-gray-700 text-white shadow-lg overflow-auto w-full rounded-md p-4">
        {JSON.stringify(user, null, 2)}
      </pre>
    </>
  )
}
