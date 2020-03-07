import {
  UserState,
  UserActions,
  ADD_JWT_TOKEN,
  LOAD_USER_SUCCESS,
  LoadUserSuccessAction,
} from '../../types'

export default function user(
  state: UserState = {
    token: null,
    user: null,
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case ADD_JWT_TOKEN: {
      const { token } = action.payload
      return { ...state, token }
    }
    case LOAD_USER_SUCCESS: {
      const { user } = action.payload
      return { ...state, user }
    }
    default:
      return state
  }
}
