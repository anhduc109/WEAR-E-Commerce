import axios from 'axios'
import { Dispatch } from 'redux'

import {
  ADD_JWT_TOKEN,
  ADDJWTTokenAction,
  LOAD_USER_SUCCESS,
  LoadUserSuccessAction,
  LOG_OUT,
  LogOutAction,
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

export function loadUserSuccess(user: any) {
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
    },
  }
}
