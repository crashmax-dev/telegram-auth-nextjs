import { withSessionRoute } from 'lib/session'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { TelegramUser } from 'components/TelegramLoginWidget'

export interface User extends Omit<TelegramUser, 'hash'> {
  isLoggedIn: boolean
}

export default withSessionRoute(sessionRoute)

async function sessionRoute(req: NextApiRequest, res: NextApiResponse<Partial<User>>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({ ...req.session.user })
  } else {
    res.json({ isLoggedIn: false })
  }
}
