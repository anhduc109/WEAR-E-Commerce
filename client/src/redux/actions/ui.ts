import { TOGGLE_BAN_ALERT, ToggleBanAlertAction } from '../../types'

export function toggleBanAlert(isAlertOpen: boolean): ToggleBanAlertAction {
  return {
    type: TOGGLE_BAN_ALERT,
    payload: {
      isAlertOpen,
    },
  }
}
