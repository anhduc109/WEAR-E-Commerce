import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  isAdmin: boolean
  isBanned: boolean
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  cart: { product: mongoose.Types.ObjectId; quantity: number }[]
}

export const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
