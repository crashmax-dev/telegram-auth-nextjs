import mongoose, { Schema, Model, model } from 'mongoose'
import type { User } from 'types/user'

export type IModelUser = Omit<User, 'hash'> 

const UserSchema = new Schema<IModelUser>({
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

const UserModel: Model<IModelUser> = mongoose.models.User || model('User', UserSchema)
export default UserModel
