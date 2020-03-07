import axios from 'axios'
import { Dispatch } from 'redux'

import {
  ADD_JWT_TOKEN,
  ADDJWTTokenAction,
  LOAD_USER_SUCCESS,
  LoadUserSuccessAction,
} from '../../types'

export function addJWTToken(token: String): ADDJWTTokenAction {
  return {
    type: ADD_JWT_TOKEN,
    payload: {
      token,
    },
  }
}

export function loadUser(token: String) {
  return (dispatch: Dispatch) => {
    const config = {
      headers: {
        Authorization: token,
      },
    }
    axios.get('http://localhost:3000/api/v1/users/auth', config).then(res => {
      dispatch(loadUserSuccess(res.data))
    })
  }
}

export function loadUserSuccess(user: any) {
  return {
    type: LOAD_USER_SUCCESS,
    payload: {
      user,
    },
  }
}
