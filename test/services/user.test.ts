import User from '../../src/models/User'
import Product from '../../src/models/Product'
import { Request, Response, NextFunction } from 'express'
import UserService from '../../src/services/user'
import ProductService from '../../src/services/product'
import * as dbHelper from '../db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

jest.mock(
  '../../src/middlewares/authJWT',
  () => (req: Request, res: Response, next: NextFunction) => next()
)

async function createProduct() {
  const product = new Product({
    name: 'Nike Pants',
    description: 'Nice Nike Pants',
    categories: ['Men'],
    variants: ['Black', 'Blue'],
    price: 80,
    img: 'nike.com',
  })
  return await ProductService.create(product)
}

async function createUser() {
  const user = new User({
    username: 'Random User',
    firstName: 'Jay',
    lastName: 'Park',
    email: 'random@gmail.com',
    password: 'randompassword',
    cart: [],
  })
  return await User.create(user)
}

describe('user service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create an user', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('email', 'random@gmail.com')
    expect(user).toHaveProperty('firstName', 'Jay')
  })

  //   it('should add a product to cart'),
  //     async () => {
  //       const user = await createUser()
  //       expect(user).toHaveProperty('_id')

  //       const
  //     }

  it('should get the cart', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')

    const user = await createUser()
    const found = await UserService.getCart(user._id)
    expect(found).toHaveProperty('_id')

    await UserService.addProductToCart(product.id, found.id)

    const updateUser = await UserService.getCart(user.id)
    expect(updateUser.cart.length).toEqual(1)
    expect(updateUser.cart[0].product).toHaveProperty('_id')
  })

  it('should increase the quantity of product in cart', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')

    const user = await createUser()
    const found = await UserService.getCart(user._id)
    expect(found).toHaveProperty('_id')

    await UserService.addProductToCart(product.id, found.id)
    const updateUser2 = await UserService.addProductToCart(product.id, found.id)
    expect(updateUser2.cart.length).toEqual(1)
    expect(updateUser2.cart[0].quantity).toEqual(2)
  })

  it('should decrease the quantity of product in cart', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')

    const user = await createUser()
    const found = await UserService.getCart(user._id)
    expect(found).toHaveProperty('_id')

    await UserService.addProductToCart(product.id, found.id)
    await UserService.addProductToCart(product.id, found.id)

    const updateUser3 = await UserService.decreaseQuantityOfProduct(
      product.id,
      found.id
    )

    expect(updateUser3.cart.length).toEqual(1)
    expect(updateUser3.cart[0].quantity).toEqual(1)
  })

  it('should remove product in cart', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')

    const user = await createUser()
    const found = await UserService.getCart(user._id)
    expect(found).toHaveProperty('_id')

    await UserService.addProductToCart(product.id, found.id)

    const updateUser2 = await UserService.removeProductInCart(
      product.id,
      found.id
    )
    expect(updateUser2.cart.length).toEqual(0)
  })
})
