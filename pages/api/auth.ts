import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserData } from 'telegram-login-button'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      res.status(200).json({
        ok: checkTelegramAuth(req.body, process.env.BOT_TOKEN as string),
        body: req.body
      })
    } else {
      throw new Error('Method Not Allowed!')
    }
  } catch (err) {
    res.status(403).json({
      ok: false,
      error: (err as Error).message,
      body: req.body
    })
  }
}

function checkTelegramAuth(user: UserData, token: string, lifespan = 60) {
  const values = []

  for (const [key, value] of Object.entries(user)) {
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

  const timespan = Math.round(new Date().getTime() / 1000)

  if ((timespan - user.auth_date) > lifespan) {
    throw new Error('Authorization data is expired!')
  }

  return user.hash === hash
}