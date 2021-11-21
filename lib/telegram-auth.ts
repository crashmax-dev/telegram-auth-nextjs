import crypto from 'crypto'
import { object, string, number } from 'yup'
import type { SchemaOf } from 'yup'
import type { TelegramUser } from 'components/TelegramLoginWidget'

export const telegramAuth = (data: TelegramUser, token: string) => {
  validateUserData(data)

  const values = []
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'hash') {
      values.push(`${key}=${value}`)
    }
  }

  const secret = crypto
    .createHash('sha256')
    .update(token)
    .digest()

  const sorted = values
    .sort()
    .join('\n')

  const hash = crypto
    .createHmac('sha256', secret)
    .update(sorted)
    .digest('hex')

  const isLoggedIn = data.hash === hash
  if (!isLoggedIn) {
    throw new Error('Authorization data is not valid!')
  }

  const {
    id,
    username,
    first_name,
    last_name,
    photo_url,
    auth_date
  } = data

  return {
    isLoggedIn,
    id,
    username,
    first_name,
    last_name,
    photo_url,
    auth_date
  }
}

export const validateUserData = (data: TelegramUser) => {
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
