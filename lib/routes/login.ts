
import { withSessionRoute } from 'lib/iron-session'
import { telegramAuth } from 'lib/validate-auth'
import { validateUser } from 'lib/validate-user'
import mongodb from 'lib/mongodb'
import UserModel from 'models/user.model'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Method Not Allowed!')
    }

    if (req.session.user) {
      throw new Error('You are authorized!')
    }

    const body = validateUser(req.body)
    const userData = telegramAuth(body, process.env.BOT_TOKEN)

    await mongodb()

    const currentUserRole = await UserModel
      .findOne({ id: userData.id })
      .select('role')

    await UserModel.findOneAndUpdate(
      { id: userData.id },
      {
        ...userData,
        role: currentUserRole?.role
      },
      {
        new: true,
        upsert: true,
        overwrite: true,
        setDefaultsOnInsert: true
      }
    )

    const response = { ok: true, ...userData }
    req.session.user = response
    await req.session.save()
    res.json(response)
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: (err as Error).message
    })
  }
}
