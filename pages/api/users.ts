import { connectToDatabase } from 'lib/mongodb'
import { UserModel } from 'models/user.model'
import { Roles } from 'models/user.document'
import { withSessionRoute } from 'lib/iron-session'
import type { UserResponse } from 'types/user'
import type { RolesType } from 'models/user.document'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(usersRoute)

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase()
    await validateRole(Roles.root, req.session.user)

    const { method } = req

    if (method === 'GET') {
      const users = await getUsers()
      return res.json({ ok: true, users: users.reverse() })
    }

    if (method === 'POST') {
      return changeUserRole(req, res)
    }

    throw new Error('Method Not Allowed!')
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: (err as Error).message
    })
  }
}

export async function validateRole(role: RolesType, session?: UserResponse) {
  if (!session) {
    throw new Error('You are not authorized!')
  }

  const userRole = await UserModel
    .findOne({ id: session.id })
    .select('role')

  if (userRole) {
    if (!(userRole.role === role)) {
      throw new Error('Access denied!')
    }

    return userRole.role
  }
}

export async function getUsers() {
  return await UserModel
    .find()
    .select('-_id -session._id')
    .lean()
}

async function changeUserRole(req: NextApiRequest, res: NextApiResponse) {
  const { id, role } = req.body

  if (role in Roles) {
    await UserModel.findOneAndUpdate(
      { id },
      { role }
    )

    res.json({ ok: true })
  } else {
    throw new Error('User role is not correct')
  }
}
