import { withSessionRoute } from 'lib/iron-session'
import type { NextApiRequest } from 'next'
import type { ResponseSession } from 'types/user'

export default withSessionRoute(logoutRoute)

function logoutRoute(req: NextApiRequest, res: ResponseSession) {
  req.session.destroy()
  res.json({ ok: false })
}
