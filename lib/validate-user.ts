import { object, string, number } from 'yup'
import type { SchemaOf } from 'yup'
import type { User } from 'types/user'

export const validateUser = (userData: User) => {
  const userSchema: SchemaOf<User> = object({
    id: number().required(),
    first_name: string().required(),
    last_name: string().optional(),
    username: string().optional(),
    photo_url: string().optional(),
    auth_date: number().required(),
    hash: string().required()
  }).defined()

  return userSchema.validateSync(userData)
}
