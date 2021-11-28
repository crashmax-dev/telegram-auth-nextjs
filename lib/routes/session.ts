import { withSessionRoute } from 'lib/iron-session'
import type { NextApiRequest } from 'next'
import type { SessionResponse } from 'types/user'

export default withSessionRoute(sessionRoute)

async function sessionRoute(req: NextApiRequest, res: SessionResponse) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({ ...req.session.user })
  } else {
    res.json({ ok: false })
  }
}
