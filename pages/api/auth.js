import crypto from 'crypto'

export default function handler(req, res) {
  try {
    if (req.method === 'POST') {
      res.status(200).json({
        ok: checkTelegramAuth(req.body, process.env.BOT_TOKEN),
        body: req.body
      })
    } else {
      throw new Error('Method Not Allowed!')
    }
  } catch (err) {
    res.status(403).json({
      ok: false,
      error: err.message,
      body: req.body
    })
  }
}

function checkTelegramAuth(user, token, lifespan = 60) {
  const values = []

  for (const [key, value] of Object.entries(user)) {
    if (key !== 'hash') {
      values.push(`${key}=${value}`)
    }
  }

  const secret = crypto
    .createHash('sha256')
    .update(token)
    .digest()

  const sort = values
    .sort()
    .join('\n')

  const hash = crypto
    .createHmac('sha256', secret)
    .update(sort)
    .digest('hex')

  const timespan = Math.round(new Date().getTime() / 1000)

  if ((timespan - user.auth_date) > lifespan) {
    throw new Error('Authorization data is expired!')
  }

  return user.hash === hash
}