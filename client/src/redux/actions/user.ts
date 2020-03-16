import axios from 'axios'
import { Dispatch } from 'redux'

import {
  ADD_JWT_TOKEN,
  ADDJWTTokenAction,
  LOAD_USER_SUCCESS,
  LOG_OUT,
  LogOutAction,
  GET_CART,
  GetCartAction,
  User,
  CartProduct,
  baseURL,
} from '../../types'

export function addJWTToken(token: string): ADDJWTTokenAction {
  return {
    type: ADD_JWT_TOKEN,
    payload: {
      token,
    },
  }
}

export function loadUserStart() {
  return {
    type: 'LOAD_USER_START',
    payload: {
      userLoaded: false,
    },
  }
}

export function loadUser(decodedToken: any) {
  return {
    type: LOAD_USER_SUCCESS,
    payload: {
      userLoaded: true,
      user: decodedToken,
    },
  }
}

export function loadUserSuccess(user: User) {
  return {
    type: LOAD_USER_SUCCESS,
    payload: {
      user,
      userLoaded: true,
    },
  }
}

export function logOut(): LogOutAction {
  return {
    type: LOG_OUT,
    payload: {
      user: null,
      userLoaded: false,
      token: null,
      cart: [],
    },
  }
}

export function fetchCart(token: string, userId: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return (dispatch: Dispatch<GetCartAction>) => {
    return axios.post(`${baseURL}/users/cart`, { userId }, config).then(res => {
      dispatch(getCart(res.data))
    })
  }
}

export const isAdmin = (isAdmin: boolean) => ({
  type: 'CHECK_ADMIN',
  payload: {
    isAdmin,
  },
})

export function getCart(cart: CartProduct[]): GetCartAction {
  return {
    type: GET_CART,
    payload: {
      cart,
    },
  }
}

export function decreaseQuantityFetch(
  token: string | null,
  userId: string | undefined,
  productId: string,
  isIncreased: boolean
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const body = {
    userId,
    productId,
    isIncreased,
  }

  return (dispatch: Dispatch) => {
    return axios.put(`${baseURL}/users/cart`, body, config).then(res => {
      dispatch(getCart(res.data))
    })
  }
}

export function manageProductInCartFetch(
  token: string | null,
  userId: string | undefined,
  productId: string | undefined,
  isIncreased: boolean
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const body = {
    userId,
    productId,
    isIncreased,
  }

  return (dispatch: Dispatch) => {
    return axios.put(`${baseURL}/users/cart`, body, config).then(res => {
      dispatch(getCart(res.data))
    })
  }
}

export function deleteProductInCartFetch(
  token: string | null,
  userId: string | undefined,
  productId: string | undefined
) {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }

  // const body = {
  //   userId,
  //   productId,
  // }

  return (dispatch: Dispatch) => {
    return axios
      .delete(`${baseURL}/users/cart`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId, productId },
      })
      .then(res => {
        dispatch(getCart(res.data))
      })
  }
}
