import { withSessionRoute } from 'lib/session'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from 'lib/routes/session'

export default withSessionRoute(logoutRoute)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<Partial<User>>) {
  req.session.destroy()
  res.json({ isLoggedIn: false })
}
