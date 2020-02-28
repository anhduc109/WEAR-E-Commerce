import express from 'express'

import {
  createProduct,
  updateProduct,
  findById,
  findAll,
  deleteProduct,
} from '../controllers/product'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix
router.get('/', findAll)
router.get('/:productId', findById)
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
