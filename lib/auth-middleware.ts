import { loginRoute, logoutRoute, sessionRoute } from './routes'
import type { NextApiRequest, NextApiResponse } from 'next'

interface TelegramAuthOptions { }

async function TelegramAuthHandler(req: NextApiRequest, res: NextApiResponse, options: TelegramAuthOptions) {
  const {
    auth,
    action = auth[0]
  } = req.query

  if (req.method === 'GET') {
    switch (action) {
      case 'session':
        return sessionRoute(req, res)
      default:
    }
  } else if (req.method === 'POST') {
    switch (action) {
      case 'login':
        return loginRoute(req, res)
      case 'logout':
        return logoutRoute(req, res)
      default:
    }
  }
}

export default function TelegramAuth(...args: any) {
  if (args.length === 1) {
    return (req: NextApiRequest, res: NextApiResponse) => TelegramAuthHandler(req, res, args[0])
  }

  // @ts-ignore
  return TelegramAuthHandler(...args)
}