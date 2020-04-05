import { takeLatest, select, put } from 'redux-saga/effects'
import jwt from 'jsonwebtoken'

import {
  ADD_JWT_TOKEN,
  ADDJWTTokenAction,
  LOAD_USER_SUCCESS,
  AppState,
  LogOutAction,
  LOG_OUT,
} from '../../types'
import { isAdmin, toggleBanAlert, logOut } from '../actions'

function* saveTokenToLocalStorage(action: ADDJWTTokenAction) {
  const state: AppState = yield select()

  const token: any = state.user.token

  const decoded: any = jwt.decode(token)

  yield put(isAdmin(decoded?.isAdmin ? decoded.isAdmin : false))
  yield localStorage.setItem('token', JSON.stringify(token))
}

function* checkIsBanned(action: any) {
  const state: AppState = yield select()

  const token: any = state.user.token

  const decoded: any = jwt.decode(token)

  if (decoded.isBanned === true) {
    yield put(logOut())
    yield put(toggleBanAlert(true))
  }
}

function* removeTokenFromLocalStorage(action: LogOutAction) {
  yield localStorage.removeItem('token')
  yield put(isAdmin(false))
}

export default [
  takeLatest(ADD_JWT_TOKEN, saveTokenToLocalStorage),
  takeLatest([ADD_JWT_TOKEN, LOAD_USER_SUCCESS], checkIsBanned),
  takeLatest(LOG_OUT, removeTokenFromLocalStorage),
]
