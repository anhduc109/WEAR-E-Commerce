import {
  ProductState,
  ProductActions,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_CART,
} from '../../types'

export default function product(
  state: ProductState = {
    products: [],
  },
  action: ProductActions
): ProductState {
  switch (action.type) {
    // case ADD_PRODUCT: {
    //   const { product } = action.payload
    //   if (state.inCart.find(p => p._id === product._id)) {
    //     return state
    //   }
    //   // Always return new state (e.g, new object) if changed
    //   return { ...state, inCart: [...state.inCart, product] }
    // }

    // case REMOVE_PRODUCT: {
    //   const { product } = action.payload
    //   const index = state.inCart.findIndex(p => p._id === product._id)
    //   if (index >= 0) {
    //     state.inCart.splice(index, 1)
    //     return { ...state, inCart: [...state.inCart] }
    //   }
    //   return state
    // }

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
