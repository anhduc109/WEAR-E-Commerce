import request from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { ProductDocument } from '../../src/models/Product'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

// const Duc: any = {
//   email: 'random@gmail.com',
//   username: 'Duc',
//   firstName: 'Duc',
//   lastName: 'Pham',
//   isAdmin: true,
//   isBanned: false,
//   password: 'sdasdasdas',
//   cart: [],
// }

// const token = jwt.sign(Duc, JWT_SECRET, {
//   expiresIn: '1h',
// })

jest.mock(
  '../../src/middlewares/authJWT',
  () => (req: Request, res: Response, next: NextFunction) => next()
)

async function createProduct(override?: Partial<ProductDocument>) {
  let product = {
    name: 'T Shirt',
    description: 'Nice TShirt',
    categories: ['Men'],
    variants: ['Red', 'Blue'],
    price: 100,
    img: 'google.com',
  }

  if (override) {
    product = { ...product, ...override }
  }

  return await request(app)
    .post('/api/v1/products')
    // .set('Authorization', `Bearer ${token}`)
    .send(product)
}

describe('product controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const res = await createProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('T SHIRT')
  })

  it('should get back an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app).get(`/api/v1/products/${productId}`)

    expect(res.body._id).toEqual(productId)
  })

  it('should not get back a non-existing product', async () => {
    const res = await request(app).get(
      `/api/v1/products/${nonExistingProductId}`
    )
    expect(res.status).toBe(404)
  })

  it('should get back all product', async () => {
    const res1 = await createProduct({
      name: 'Nike Shirt',
      price: 20,
    })
    const res2 = await createProduct({
      name: 'Puma Shirt',
      price: 32,
    })

    const res3 = await request(app).get('/api/v1/products')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'Nike T-Shirt',
      price: 2016,
    }

    res = await request(app)
      .put(`/api/v1/products/${productId}`)
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('NIKE T-SHIRT')
    expect(res.body.price).toEqual(2016)
  })

  it('should delete an existing product', async () => {
    // let res = await createProduct()
    // expect(res.status).toBe(200)
    // const productId = res.body._id

    let res = await request(app).delete(
      '/api/v1/products/5e66645d4b4d272b6c6aab7'
    )

    expect(res.status).toEqual(204)

    res = await request(app).get('/api/v1/products/5e66645d4b4d272b6c6aab7')
    expect(res.status).toBe(404)
  })
})
