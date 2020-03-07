import {
  TOGGLE_DIALOG,
  ToggleDialogAction,
  DialogType,
} from '../../types'

export function toggleDialog(dialog: DialogType): ToggleDialogAction {
  return {
    type: TOGGLE_DIALOG,
    payload: {
      dialog,
    }
  }
}
