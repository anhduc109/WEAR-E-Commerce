import express from 'express'

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/admin prefix

router.post('/products', createProduct)
router.put('/products/:productId', updateProduct)
router.delete('/products/:productId', deleteProduct)

export default router
