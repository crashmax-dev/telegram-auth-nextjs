import crypto from 'crypto'
import { User, UserApiResponse } from 'types/user'

export const telegramAuth = (data: User, token: string): UserApiResponse => {
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

  if (data.hash !== hash) {
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
    ok: true,
    id,
    username,
    first_name,
    last_name,
    photo_url,
    auth_date
  }
}

