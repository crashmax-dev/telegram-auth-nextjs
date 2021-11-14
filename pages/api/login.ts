import { sessionOptions } from 'lib/session'
import { telegramAuth } from 'lib/telegram-auth'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Method Not Allowed!')
    }

    const body = await req.body
    const user = telegramAuth(body, process.env.BOT_TOKEN as string)
    req.session.user = { isLoggedIn: true, ...user }
    await req.session.save()
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: (err as Error).message })
  }
}
