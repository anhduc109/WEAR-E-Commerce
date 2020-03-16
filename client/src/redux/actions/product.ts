import { Dispatch } from 'redux'
import axios from 'axios'

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  GET_ALL_PRODUCTS,
  ProductActions,
  Product,
} from '../../types'

export function addProduct(product: Product): ProductActions {
  return {
    type: ADD_PRODUCT,
    payload: {
      product,
    },
  }
}

export function removeProduct(product: Product): ProductActions {
  return {
    type: REMOVE_PRODUCT,
    payload: {
      product,
    },
  }
}

export function fetchAllProduct(token: string | null) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return (dispatch: Dispatch) => {
    return axios
      .get('http://localhost:3000/api/v1/products', config)
      .then(res => {
        dispatch(getAllProducts(res.data))
      })
  }
}

export function getAllProducts(products: Product) {
  return {
    type: GET_ALL_PRODUCTS,
    payload: {
      products,
    },
  }
}

// Async action processed by redux-thunk middleware
export function fetchProduct(productId: string) {
  return (dispatch: Dispatch) => {
    return fetch(`products/${productId}`)
      .then(resp => resp.json())
      .then(product => {
        dispatch(addProduct(product))
      })
  }
}
