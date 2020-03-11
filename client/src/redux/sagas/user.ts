import { takeLatest, select, put } from 'redux-saga/effects'

import {
  ADD_JWT_TOKEN,
  ADDJWTTokenAction,
  AppState,
  LogOutAction,
  LOG_OUT,
  LOAD_USER_SUCCESS,
  LoadUserSuccessAction,
} from '../../types'
import { fetchCart } from '../actions'

function* saveTokenToLocalStorage(action: ADDJWTTokenAction) {
  const state: AppState = yield select()
  yield localStorage.setItem('token', JSON.stringify(state.user.token))
}

function* removeTokenFromLocalStorage(action: LogOutAction) {
  yield localStorage.removeItem('token')
}

// function* getCartFromUser(action: LoadUserSuccessAction) {
//   const state: AppState = yield select()
//   if (state.user.user && state.user.token) {
//     yield put(fetchCart(state.user.token, state.user.user.id))
//   }
// }

export default [
  takeLatest(ADD_JWT_TOKEN, saveTokenToLocalStorage),
  takeLatest(LOG_OUT, removeTokenFromLocalStorage),
  // takeLatest(LOAD_USER_SUCCESS, getCartFromUser),
]
