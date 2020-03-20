import { takeLatest } from 'redux-saga/effects'

import { TOGGLE_BAN_ALERT, ToggleBanAlertAction } from '../../types'

function* doSomethingWhenDialogOpen(action: ToggleBanAlertAction) {
  yield console.log(action)
}

export default [takeLatest(TOGGLE_BAN_ALERT, doSomethingWhenDialogOpen)]
