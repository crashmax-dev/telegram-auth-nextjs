import mongoose, { Document, Schema, Model, model } from 'mongoose'

export interface IUserModel extends Document {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
}

const UserSchema = new Schema<IUserModel>({
  id: {
    type: Number,
    unique: true,
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

const UserModel: Model<IUserModel> = mongoose.models.User || model('User', UserSchema)
export default UserModel
