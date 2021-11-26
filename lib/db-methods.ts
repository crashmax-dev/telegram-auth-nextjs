import UserModel, { IUser } from 'models/user'

export const findUser = async (id: number) => {
  return await UserModel.find({ id })
}

export const updateUser = async (userData: IUser) => {
  return await UserModel.findOneAndUpdate({ id: userData.id }, userData)
}

export const createUser = async (userData: IUser) => {
  return await UserModel.create(userData)
}
