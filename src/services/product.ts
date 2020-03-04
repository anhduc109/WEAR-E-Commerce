import Product, { ProductDocument } from '../models/Product'
import User, { UserDocument } from '../models/User'

function create(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

function findById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec() // .exec() will return a true Promise
    .then(product => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      return product
    })
}

function findAll(query: any): Promise<ProductDocument[]> {
  let findObject: any = {
    name: new RegExp(query.name, 'i'),
    // Should be a dropdown categories in the UI
    // This $all can catch all of the categories insde query.category array
    variants: new RegExp(query.variant, 'i'),
  }
  if (query.category) findObject.categories = { $all: query.category }
  return Product.find(findObject)
    .sort({ name: 1, price: -1 })
    .limit(parseInt(query.limit))
    .exec() // Return a Promise
}

function update(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then(product => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }

      if (update.name) {
        product.name = update.name
      }

      if (update.img) {
        product.img = update.img
      }

      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  create,
  update,
  deleteProduct,
  findById,
  findAll,
}
