import mongoose, { Schema } from 'mongoose'
import type { Model } from 'mongoose'
import { Roles } from './user.document'
import type { IUserModel } from './user.document'

const UserSchema = new Schema<IUserModel>(
  {
    id: {
      type: Number,
      unique: true,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: 'user',
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
  },
  {
    versionKey: false
  }
)

let UserModel: Model<IUserModel>

try {
  UserModel = mongoose.model('User')
} catch (_) {
  UserModel = mongoose.model('User', UserSchema)
}

export { UserModel }
