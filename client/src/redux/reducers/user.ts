import {
  UserState,
  UserActions,
  ADD_JWT_TOKEN,
  LOAD_USER_SUCCESS,
  LoadUserSuccessAction,
  LOG_OUT,
  GET_CART,
  CHECK_ADMIN,
} from '../../types'

export default function user(
  state: UserState = {
    token: null,
    user: null,
    userLoaded: false,
    cart: [],
    isAdmin: false,
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
    case CHECK_ADMIN: {
      const { isAdmin } = action.payload
      return { ...state, isAdmin }
    }
    case LOG_OUT: {
      const { user, userLoaded, token, cart } = action.payload
      return { ...state, user, userLoaded, token, cart }
    }
    case GET_CART: {
      const { cart } = action.payload
      return { ...state, cart }
    }
    default:
      return state
  }
}
