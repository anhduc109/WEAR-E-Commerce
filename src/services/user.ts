import User, { UserDocument } from '../models/User'
import mongoose from 'mongoose'

function findAll(): Promise<UserDocument> {
  return User.find()
    .exec()
    .then()
}

function banOrUnbanUser(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then(user => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      user.isBanned = !user.isBanned
      return user.save()
    })
}

function create(user: UserDocument): Promise<UserDocument> {
  // Check for existing user
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
      const existedProduct = user.cart.find(
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
      const existedProduct = user.cart.find(
        item => item.product.toHexString() == productId
      )
      if (existedProduct) {
        // Prevent user from decreasing the quantity if it is one
        if (existedProduct.quantity > 1)
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
      const existedIndex = user.cart.findIndex(
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
  findAll,
  banOrUnbanUser,
  getCart,
  addProductToCart,
  decreaseQuantityOfProduct,
  removeProductInCart,
}
