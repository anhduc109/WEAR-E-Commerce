import mongoose, { Document } from 'mongoose'

export type Categories = 'Man' | 'Woman' | 'Pants' | 'Trousers' | 'Jackets'

export type ProductDocument = Document & {
  name: string
  description: string
  categories: Categories[]
  variants: string[]
  sizes: string[]
  price: number
  img: string
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: { unique: true },
    uppercase: true,
  },
  description: String,
  categories: [String],
  variants: [String],
  sizes: {
    type: Array,
    default: ['XS', 'S', 'M', 'L', 'XL'],
  },
  price: Number,
  img: String,
})

export default mongoose.model<ProductDocument>('Product', productSchema)
