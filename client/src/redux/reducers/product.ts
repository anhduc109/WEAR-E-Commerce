import { ProductState, ProductActions, GET_ALL_PRODUCTS } from '../../types'

export default function product(
  state: ProductState = {
    products: [],
  },
  action: ProductActions
): ProductState {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      const { products } = action.payload
      return {
        ...state,
        products,
      }
    }

    default:
      return state
  }
}
