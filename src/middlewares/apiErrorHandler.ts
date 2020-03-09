import { Request, Response } from 'express'

import ApiError from '../helpers/apiError'
import logger from '../util/logger'

export default function(
  error: ApiError,
  req: Request,
  res: Response,
  next: any
) {
  if (error.source) {
    logger.error(error.source)
  }

  const statusCode = error.statusCode || 500

  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: error.message,
  })
}
