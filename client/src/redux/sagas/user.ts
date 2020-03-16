import { takeLatest, select, put } from 'redux-saga/effects'
import jwt from 'jsonwebtoken'

import {
  ADD_JWT_TOKEN,
  ADDJWTTokenAction,
  AppState,
  LogOutAction,
  LOG_OUT,
} from '../../types'
import { isAdmin } from '../actions'

function* saveTokenToLocalStorage(action: ADDJWTTokenAction) {
  const state: AppState = yield select()

  const token: any = state.user.token

  const decoded: any = jwt.decode(token)

  yield put(isAdmin(decoded?.isAdmin ? decoded.isAdmin : false))
  yield localStorage.setItem('token', JSON.stringify(token))
}

function* removeTokenFromLocalStorage(action: LogOutAction) {
  yield localStorage.removeItem('token')
  yield put(isAdmin(false))
}

export default [
  takeLatest(ADD_JWT_TOKEN, saveTokenToLocalStorage),
  takeLatest(LOG_OUT, removeTokenFromLocalStorage),
]
