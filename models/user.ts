import mongoose, { Schema, model } from 'mongoose'
import type { User } from 'types/user'

const UrlSchema = new Schema<User>({
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

export default mongoose.models.Url || model('Url', UrlSchema)
