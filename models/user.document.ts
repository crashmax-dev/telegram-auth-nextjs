import { Document } from 'mongoose'

export enum Roles {
  user = 'user',
  owner = 'owner',
  root = 'root'
}

export type RolesType = `${Roles}`

export interface UserData {
  id: number
  role: RolesType
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
}

export type IUserModel = UserData & Document
