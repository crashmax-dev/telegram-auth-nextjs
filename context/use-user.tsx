import useSWR from 'swr'
import Router from 'next/router'
import fetcher, { FetchError } from 'lib/fetcher'
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { UserResponse, TelegramUserData } from 'types/user'

type RedirectState = {
  redirectTo?: string
  redirectIfFound?: boolean
}

type UserContextState = {
  user?: UserResponse
  onLogin: (userData: TelegramUserData) => void
  onLogout: () => void
  setRedirect: (state: RedirectState) => void
}

type Props = {
  children: ReactNode
}

const UserContext = createContext<UserContextState>({} as UserContextState)

export const UserProvider = ({ children }: Props) => {
  const { data: user, mutate: mutateUser } = useSWR<UserResponse>('/api/auth/session')

  const [{ redirectTo, redirectIfFound }, _setRedirect] = useState<Required<RedirectState>>({
    redirectTo: '/',
    redirectIfFound: false
  })

  const onLogin = async (userData: TelegramUserData) => {
    try {
      mutateUser(
        await fetcher('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
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

  const setRedirect = (state: RedirectState) => {
    _setRedirect({ redirectIfFound, redirectTo, ...state })
  }

  const state: UserContextState = {
    user,
    onLogin,
    onLogout,
    setRedirect
  }

  useEffect(() => {
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
  }, [user])

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
