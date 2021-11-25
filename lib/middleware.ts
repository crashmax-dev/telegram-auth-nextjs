import loginRoute from 'lib/login'
import logoutRoute from 'lib/logout'
import sessionRoute from 'lib/session'
import type { IronSessionOptions } from 'iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface TelegramAuthOptions {
  database: () => Promise<unknown>
  session?: IronSessionOptions
}

export default function TelegramAuth(options: TelegramAuthOptions) {
  return (req: NextApiRequest, res: NextApiResponse) => TelegramAuthHandler(req, res, options)
}

async function TelegramAuthHandler(req: NextApiRequest, res: NextApiResponse, options: TelegramAuthOptions) {
  const {
    auth,
    action = auth[0]
  } = req.query

  await options.database()

  switch (action) {
    case 'session':
      return sessionRoute(req, res)
    case 'login':
      return loginRoute(req, res)
    case 'logout':
      return logoutRoute(req, res)
    default:
      res.json({ ok: false, message: 'Endpoint not found!' })
  }
}
