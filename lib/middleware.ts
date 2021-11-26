import type { NextApiRequest, NextApiResponse } from 'next'

export interface TelegramAuthOptions {
  onLogin: (req: NextApiRequest, res: NextApiResponse) => void
  onLogout: (req: NextApiRequest, res: NextApiResponse) => void
  onSession: (req: NextApiRequest, res: NextApiResponse) => void
  database: () => Promise<unknown>
}

export default function TelegramAuth(options: TelegramAuthOptions) {
  return (req: NextApiRequest, res: NextApiResponse) => TelegramAuthHandler(req, res, options)
}

async function TelegramAuthHandler(
  req: NextApiRequest, res: NextApiResponse, { database, onSession, onLogin, onLogout }: TelegramAuthOptions
) {
  const {
    auth,
    action = auth[0]
  } = req.query

  await database()

  switch (action) {
    case 'session':
      return onSession(req, res)
    case 'login':
      return onLogin(req, res)
    case 'logout':
      return onLogout(req, res)
    default:
      res.json({ ok: false, message: 'Endpoint not found!' })
  }
}
