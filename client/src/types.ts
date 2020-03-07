// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

export const ADD_JWT_TOKEN = 'ADD_JWT_TOKEN'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'

// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A product
export type Product = {
  id: string
  name: string
  price: number
}

export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}

export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG
  payload: {
    dialog: DialogType
  }
}

export type ADDJWTTokenAction = {
  type: typeof ADD_JWT_TOKEN
  payload: {
    token: String | null
  }
}

export type LoadUserSuccessAction = {
  type: typeof LOAD_USER_SUCCESS
  payload: {
    user: any
  }
}

export type UiActions = ToggleDialogAction

// Use this union in reducer
export type ProductActions = AddProductAction | RemoveProductAction

export type UserActions = ADDJWTTokenAction | LoadUserSuccessAction

export type ProductState = {
  inCart: Product[]
}

export type UserState = {
  token: String | null
  user: any
}

// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean
  }
}

export type AppState = {
  product: ProductState
  ui: UiState
  user: UserState
}
