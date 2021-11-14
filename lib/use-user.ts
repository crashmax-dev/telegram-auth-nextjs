import useSWR from 'swr'
import { useEffect } from 'react'
import Router from 'next/router'
import fetcher, { FetchError } from './fetcher'
import type { User } from 'pages/api/user'
import type { TelegramAuthData } from 'telegram-login-button'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')

  const onLogin = async (body: TelegramAuthData) => {
    try {
      mutateUser(
        await fetcher('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
      )
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.data.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  const onLogout = async () => {
    mutateUser(
      await fetcher('/api/logout', { method: 'POST' }),
      false
    )
  }

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
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
