import { withSessionRoute } from 'lib/iron-session'
import type { User } from 'lib/middleware'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(sessionRoute)

async function sessionRoute(req: NextApiRequest, res: NextApiResponse<Partial<User>>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({ ...req.session.user })
  } else {
    res.json({ ok: false })
  }
}
