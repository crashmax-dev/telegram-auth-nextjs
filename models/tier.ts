import mongoose, { Document, Schema, Model, model } from 'mongoose'
import type { IUserModel } from './user'

export enum Tiers {
  everyone = 'everyone',
  regular = 'regular',
  moderator = 'moderator'
}

export type TiersType = `${Tiers}`;

export interface ITierModel extends Document {
  user: IUserModel['_id']
  type: TiersType
}

const TierSchema = new Schema<ITierModel>({
  user: {
    type: Schema.Types.ObjectId
  },
  type: {
    type: String,
    enum: Object.values(Tiers),
    default: 'everyone'
  }
})

const TierModel: Model<ITierModel> = mongoose.models.Tier || model('Tier', TierSchema)
export default TierModel
