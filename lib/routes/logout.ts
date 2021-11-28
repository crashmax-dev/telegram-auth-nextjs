import { withSessionRoute } from 'lib/iron-session'
import type { NextApiRequest } from 'next'
import type { SessionResponse } from 'types/user'

export default withSessionRoute(logoutRoute)

function logoutRoute(req: NextApiRequest, res: SessionResponse) {
  req.session.destroy()
  res.json({ ok: false })
}
