import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { TelegramAuthData } from 'telegram-login-button'

export interface User extends Omit<TelegramAuthData, 'hash'> {
  isLoggedIn: boolean
}

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req: NextApiRequest, res: NextApiResponse<User | {}>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({ ...req.session.user })
  } else {
    res.json({ isLoggedIn: false })
  }
}
