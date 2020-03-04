import User, { UserDocument } from '../models/User'
import mongoose from 'mongoose'

function create(user: UserDocument): Promise<UserDocument> {
  return user.save()
}

function getCart(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .populate('cart.product')
    .exec()
    .then(user => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      return user
    })
}

function addProductToCart(
  productId: string,
  userId: string
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then(user => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      // Check if exist
      let existedProduct = user.cart.find(
        item => item.product.toHexString() == productId
      )
      if (existedProduct) {
        // Increase the quantity by one
        existedProduct.quantity++
      } else {
        // Add new product to cart
        user.cart = [
          ...user.cart,
          { product: mongoose.Types.ObjectId(productId), quantity: 1 },
        ]
      }

      return user
        .save()
        .then(user => user.populate('cart.product').execPopulate())
    })
}

function decreaseQuantityOfProduct(
  productId: string,
  userId: string
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then(user => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      //Check if exist
      let existedProduct = user.cart.find(
        item => item.product.toHexString() == productId
      )
      if (existedProduct) {
        // Decrease the quantity by one
        existedProduct.quantity--
      } else {
        throw new Error(`Product ${productId} not found`)
      }

      return user
        .save()
        .then(user => user.populate('cart.product').execPopulate())
    })
}

function removeProductInCart(
  productId: string,
  userId: string
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then(user => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      // Check if exist
      let existedIndex = user.cart.findIndex(
        item => item.product.toHexString() == productId
      )
      if (existedIndex !== -1) {
        // If existed, remove that product
        user.cart.splice(existedIndex, 1)
      }

      return user
        .save()
        .then(user => user.populate('cart.product').execPopulate())
    })
}

export default {
  create,
  getCart,
  addProductToCart,
  decreaseQuantityOfProduct,
  removeProductInCart,
}
