import { object, string, number } from 'yup'
import type { SchemaOf } from 'yup'
import type { TelegramUser } from 'components/TelegramLoginWidget'

export const validateUser = (data: TelegramUser) => {
  const userSchema: SchemaOf<TelegramUser> = object({
    id: number().required(),
    first_name: string().required(),
    last_name: string().optional(),
    username: string().optional(),
    photo_url: string().optional(),
    auth_date: number().required(),
    hash: string().required()
  }).defined()

  return userSchema.validateSync(data)
}
