import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'
import { JWT_SECRET } from '../util/secrets'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ForbiddenError,
} from '../helpers/apiError'

//GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.user
    if (user.isAdmin === true) {
      res.json(await UserService.findAll())
    } else throw new ForbiddenError('User is not admin')
  } catch (error) {
    if (error.statusCode === 403) next(new ForbiddenError(error.message))
    next(new NotFoundError('User not found', error))
  }
}

//PUT /users
export const banOrUnbanUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.user
    if (user.isAdmin === true) {
      res.json(await UserService.banOrUnbanUser(req.body.userId))
    } else throw new ForbiddenError('User is not admin')
  } catch (error) {
    if (error.statusCode === 403) next(new ForbiddenError(error.message))
    next(new NotFoundError('User not found', error))
  }
}

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
    }: UserDocument = req.body

    const user: UserDocument = new User({
      username,
      firstName,
      lastName,
      email,
      password,
    })

    await UserService.create(user)
    res.json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// GET /users/cart
export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserDocument = await UserService.getCart(req.body.userId)
    res.json(user.cart)
  } catch (error) {
    next(new NotFoundError('Cart not found', error))
  }
}

// PUT /users/cart
export const manageProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId
    const productId = req.body.productId
    const isIncreased = req.body.isIncreased
    if (isIncreased) {
      const updatedUser: UserDocument = await UserService.addProductToCart(
        productId,
        userId
      )
      res.json(updatedUser.cart)
    } else {
      const updatedUser: UserDocument = await UserService.decreaseQuantityOfProduct(
        productId,
        userId
      )
      res.json(updatedUser.cart)
    }
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

// DELETE /users/cart
export const removeProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId
    const productId = req.body.productId
    const updatedUser: UserDocument = await UserService.removeProductInCart(
      productId,
      userId
    )
    res.json(updatedUser.cart)
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

// POST /users/google-authenticate
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, isAdmin, id, username, isBanned } = req.user as any
    const token = await jwt.sign(
      {
        username,
        email,
        isAdmin,
        id,
        isBanned,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.json({ token, user: req.user })
  } catch (error) {
    return next(new InternalServerError())
  }
}
