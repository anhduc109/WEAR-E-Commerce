import { TOGGLE_BAN_ALERT, UiState, UiActions } from '../../types'

const defaultState: UiState = {
  isAlertOpen: false,
}

export default function ui(
  state: UiState = defaultState,
  action: UiActions
): UiState {
  switch (action.type) {
    case TOGGLE_BAN_ALERT: {
      return {
        ...state,
        isAlertOpen: action.payload.isAlertOpen,
      }
    }

    default:
      return state
  }
}
