import loginRoute from 'lib/login'
import logoutRoute from 'lib/logout'
import sessionRoute from 'lib/session'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function TelegramAuth() {
  return (req: NextApiRequest, res: NextApiResponse) => TelegramAuthHandler(req, res)
}

async function TelegramAuthHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    auth,
    action = auth[0]
  } = req.query

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
