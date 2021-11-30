import { connectToDatabase } from 'lib/mongodb'
import { UserModel } from 'models/user.model'
import { Roles } from 'models/user.document'
import { withSessionRoute } from 'lib/iron-session'
import type { UserResponse } from 'types/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(usersRoute)

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    await validateSession(req.session.user)
    switch (req.method) {
      case 'DELETE':
        return deleteUser(req, res)
      case 'PATCH':
        return changeUserRole(req, res)
      default:
        throw new Error('Method Not Allowed!')
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: (err as Error).message
    })
  }
}

async function validateSession(session?: UserResponse) {
  if (!session) {
    throw new Error('You are not authorized!')
  }

  const userRole = await UserModel
    .findOne({ id: session.id })
    .select('role')

  if (!(Roles.root === userRole!.role)) {
    throw new Error('Forbidden!')
  }
}

export async function getUsers(session?: UserResponse) {
  await connectToDatabase()
  await validateSession(session)
  return await UserModel
    .find()
    .select('-_id')
    .lean()
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase()
  res.json({ ok: false })
}

async function changeUserRole(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase()

  const { id, role } = req.body
  if (role in Roles) {
    await UserModel.findOneAndUpdate(
      { id },
      { role }
    )

    res.json({ ok: true })
  } else {
    res.json({ ok: false })
  }
}
