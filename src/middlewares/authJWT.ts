import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'
import logger from '../util/logger'
import User from '../models/User'

export default async function authJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = (req.headers['authorization'] || '').split('Bearer ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const user = await User.findOne({ email: decoded.email }).exec()
    req.user = user as any
    next()
  } catch (error) {
    logger.error(error)
    return next(new ForbiddenError())
  }
}
