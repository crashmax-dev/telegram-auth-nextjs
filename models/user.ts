import mongoose, { Schema, Model, model } from 'mongoose'
import type { User } from 'types/user'

export type IUser = Omit<User, 'hash'> 

const UserSchema = new Schema<IUser>({
  id: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  username: {
    type: String
  },
  photo_url: {
    type: String
  },
  auth_date: {
    type: Number
  }
})

const UserModel: Model<IUser> = mongoose.models.User || model('User', UserSchema)
export default UserModel
