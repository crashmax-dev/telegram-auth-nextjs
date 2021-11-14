import crypto from 'crypto'
import { object, string, number, SchemaOf } from 'yup'
import { TelegramAuthData } from 'telegram-login-button'

export const telegramAuth = (data: TelegramAuthData, token: string) => {
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

  const sort = values
    .sort()
    .join('\n')

  const hash = crypto
    .createHmac('sha256', secret)
    .update(sort)
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

export const validateUserData = (data: TelegramAuthData) => {
  const userSchema: SchemaOf<TelegramAuthData> = object({
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