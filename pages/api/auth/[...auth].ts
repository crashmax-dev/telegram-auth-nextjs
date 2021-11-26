import mongodb from 'lib/mongodb'
import loginRoute from 'lib/login'
import logoutRoute from 'lib/logout'
import sessionRoute from 'lib/session'
import TelegramAuth from 'lib/middleware'
import UserModel, { IUser } from 'models/user'

export default TelegramAuth({
  onLogin: async (req, res) => {
    await mongodb()

    const {
      id,
      username,
      first_name,
      last_name,
      photo_url,
      auth_date
    } = req.session.user

    const user = {
      id,
      username,
      first_name,
      last_name,
      photo_url,
      auth_date
    }

    const isUserExist = await findUser(id)
    if (isUserExist) {
      updateUser(user)
    } else {
      createUser(user)
    }

    loginRoute(req, res)
  },
  onLogout: async (req, res) => {
    logoutRoute(req, res)
  },
  onSession: async (req, res) => {
    sessionRoute(req, res)
  }
})

export const findUser = async (id: number) => {
  return await UserModel.find({ id })
}

export const updateUser = async (userData: IUser) => {
  return await UserModel.findOneAndUpdate({ id: userData.id }, userData)
}

export const createUser = async (userData: IUser) => {
  return await UserModel.create(userData)
}
