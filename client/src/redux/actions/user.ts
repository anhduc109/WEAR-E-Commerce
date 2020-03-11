import axios from 'axios'
import { Dispatch } from 'redux'

import {
  ADD_JWT_TOKEN,
  ADDJWTTokenAction,
  LOAD_USER_SUCCESS,
  LOG_OUT,
  LogOutAction,
  GET_CART,
  Product,
  GetCartAction,
  User,
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

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// }
// return axios
//   .get('http://localhost:3000/api/v1/users/auth', config)
//   .then(res => {
//     dispatch(loadUserSuccess(res.data))
//   })
//   }

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
    return axios
      .post('http://localhost:3000/api/v1/users/cart', { userId }, config)
      .then(res => {
        dispatch(getCart(res.data))
      })
  }
}

export function getCart(cart: Product[]): GetCartAction {
  return {
    type: GET_CART,
    payload: {
      cart,
    },
  }
}
