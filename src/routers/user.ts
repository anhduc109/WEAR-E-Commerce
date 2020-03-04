import express from 'express'

import {
  createUser,
  getCart,
  manageProductInCart,
  removeProductInCart,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.post('/', createUser)

router.get('/cart', getCart)
router.put('/cart', manageProductInCart)
router.delete('/cart', removeProductInCart)

export default router
