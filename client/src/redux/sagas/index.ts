import { all } from 'redux-saga/effects'

import userSagas from './user'
import productSagas from './product'
import uiSagas from './ui'

export default function* rootSaga() {
  yield all([...userSagas, ...productSagas, ...uiSagas])
}
