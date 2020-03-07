import { takeLatest, select } from 'redux-saga/effects'

import { ADD_JWT_TOKEN, ADDJWTTokenAction, AppState } from '../../types'

function* saveTokenToLocalStorage(action: ADDJWTTokenAction) {
  const state: AppState = yield select()
  yield localStorage.setItem('token', JSON.stringify(state.user.token))
}

export default [takeLatest(ADD_JWT_TOKEN, saveTokenToLocalStorage)]
