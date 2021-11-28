import mongodb from 'lib/mongodb'
import UserModel from 'models/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  // unique @crashmax id
  if (req.session.user?.id === 216972324) {
    await mongodb()
    const users = await UserModel.find().select('-_id -__v')
    res.json({ ok: true, users })
  } else {
    res.json({ ok: false })
  }
}
