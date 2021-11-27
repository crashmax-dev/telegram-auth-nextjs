import type { IModelUser } from 'models/user'
import type { NextApiResponse } from 'next'

export interface User {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export interface UserResponse extends IModelUser {
  ok: boolean
}

export type ResponseSession = NextApiResponse<Partial<UserResponse>>
