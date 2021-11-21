import { withSessionRoute } from 'lib/iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from 'lib/middleware'

export default withSessionRoute(logoutRoute)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<Partial<User>>) {
  if (req.session.user) {
    req.session.destroy()
    res.json({ ok: true })
  } else {
    res.json({ ok: false })
  }
}
