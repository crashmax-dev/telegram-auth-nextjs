
import { withSessionRoute } from 'lib/iron-session'
import { telegramAuth } from 'lib/validate-auth'
import { validateUser } from 'lib/validate-user'
import mongodb from 'lib/mongodb'
import UserModel from 'models/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import TierModel from 'models/tier'

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
    const { _id } = await UserModel.findOneAndUpdate(
      { id: user.id },
      { ...user },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    await TierModel.create({ _id })

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
