import { NextApiResponse } from 'next'

export interface User {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export interface UserApiResponse extends Omit<User, 'hash'> {
  ok: boolean
}

export type ResponseSession = NextApiResponse<Partial<UserApiResponse>>
