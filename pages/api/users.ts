import mongodb from 'lib/mongodb'
import UserModel from 'models/user'
import { STAFF_USER_ID } from 'lib/consts'
import { withSessionRoute } from 'lib/iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(usersRoute)

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user?.id === STAFF_USER_ID) {
    await mongodb()
    const users = await UserModel.find().select('-_id -__v')
    res.json({ ok: true, users })
  } else {
    res.json({ ok: false })
  }
}
