import express, { Response, Request } from 'express'
import passport from 'passport'

import {
  createUser,
  getCart,
  manageProductInCart,
  removeProductInCart,
  authenticate,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.post('/', createUser)

router.get('/auth', (req: Request, res: Response) => {
  res.send(req.user)
})

router.post('/cart', getCart)
router.put('/cart', manageProductInCart)
router.delete('/cart', removeProductInCart)

// Google Login
router.post(
  '/google-authenticate',
  passport.authenticate('google-id-token'),
  authenticate
)

export default router
