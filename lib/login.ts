
import { withSessionRoute } from 'lib/iron-session'
import { telegramAuth } from 'lib/validate-auth'
import { validateUser } from 'lib/validate-user'
import mongodb from 'lib/mongodb'
import UserModel from 'models/user'
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
    const user = telegramAuth(body, process.env.BOT_TOKEN)

    await mongodb()
    const isUserExist = await UserModel.find({ id: user.id })
    if (isUserExist) {
      await UserModel.findOneAndUpdate({ id: user.id }, user)
    } else {
      await UserModel.create(user)
    }

    const response = { ok: true, ...user }
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
