import type { NextApiResponse } from 'next'

export interface TelegramUserData {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export type User = Omit<TelegramUserData, 'hash'>

export interface UserResponse extends User {
  ok: boolean
}

export type SessionResponse = NextApiResponse<Partial<UserResponse>>
