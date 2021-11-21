import { withSessionRoute } from 'lib/iron-session'
import { telegramAuth } from 'lib/validate-auth'
import { validateUser } from 'lib/validate-user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Method Not Allowed!')
    }

    const body = validateUser(req.body)
    const user = telegramAuth(body, process.env.BOT_TOKEN)
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: (err as Error).message
    })
  }
}
