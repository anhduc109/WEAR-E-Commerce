import { takeLatest, select } from 'redux-saga/effects'

import {
  ADD_JWT_TOKEN,
  ADDJWTTokenAction,
  AppState,
  LogOutAction,
  LOG_OUT,
} from '../../types'

function* saveTokenToLocalStorage(action: ADDJWTTokenAction) {
  const state: AppState = yield select()
  yield localStorage.setItem('token', JSON.stringify(state.user.token))
}

function* removeTokenFromLocalStorage(action: LogOutAction) {
  yield localStorage.removeItem('token')
}

export default [
  takeLatest(ADD_JWT_TOKEN, saveTokenToLocalStorage),
  takeLatest(LOG_OUT, removeTokenFromLocalStorage),
]
