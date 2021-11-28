import useSWR from 'swr'
import { useEffect } from 'react'
import Router from 'next/router'
import fetcher, { FetchError } from './fetcher'
import { UserResponse, TelegramUserData } from 'types/user'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<UserResponse>('/api/auth/session')

  const onLogin = async (body: TelegramUserData) => {
    try {
      mutateUser(
        await fetcher('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
      )
    } catch (err) {
      if (err instanceof FetchError) {
        console.error(err.data.message)
      } else {
        console.error('An unexpected error happened:', err)
      }
    }
  }

  const onLogout = async () => {
    mutateUser(
      await fetcher('/api/auth/logout', { method: 'POST' }),
      false
    )
    Router.push(redirectTo)
  }

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.ok) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.ok)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return {
    user,
    onLogin,
    onLogout,
    mutateUser
  }
}
