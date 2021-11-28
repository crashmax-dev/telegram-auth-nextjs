import { Document } from 'mongoose'

export enum Tier {
  everyone = 'everyone',
  regular = 'regular',
  moderator = 'moderator'
}

export type TiersType = `${Tier}`

export interface IUserModel extends Document {
  id: number
  type: TiersType
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
}
