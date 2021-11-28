import mongoose, { Schema, model } from 'mongoose'
import type { Model } from 'mongoose'
import { Tier } from './user.document'
import type { IUserModel } from './user.document'

const UserSchema = new Schema<IUserModel>({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: Tier,
    default: 'everyone'
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
}, { versionKey: false })

const UserModel: Model<IUserModel> = mongoose.models.User || model('User', UserSchema)
export default UserModel
