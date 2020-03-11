import {
  UserState,
  UserActions,
  ADD_JWT_TOKEN,
  LOAD_USER_SUCCESS,
  LoadUserSuccessAction,
  LOG_OUT,
} from '../../types'

export default function user(
  state: UserState = {
    token: null,
    user: null,
    userLoaded: false,
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case ADD_JWT_TOKEN: {
      const { token } = action.payload
      return { ...state, token }
    }
    case LOAD_USER_SUCCESS: {
      const { user, userLoaded } = action.payload
      return { ...state, user, userLoaded }
    }
    case LOG_OUT: {
      const { user, userLoaded, token } = action.payload
      return { ...state, user, userLoaded, token }
    }
    default:
      return state
  }
}
