import { withSessionRoute } from 'lib/session'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from 'pages/api/user'

export default withSessionRoute(logoutRoute)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<Partial<User>>) {
  req.session.destroy()
  res.json({ isLoggedIn: false })
}
