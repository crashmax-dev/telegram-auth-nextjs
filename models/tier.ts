import mongoose, { Document, Schema, Model, model } from 'mongoose'
import type { IUserModel } from './user'

export interface ITierModel extends Document {
  user: IUserModel['_id']
  type: 'everyone' | 'regular' | 'moderator'
}

const TierSchema = new Schema<ITierModel>({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    default: 'everyone',
    required: true
  }
})

const TierModel: Model<ITierModel> = mongoose.models.Tier || model('Tier', TierSchema)
export default TierModel
