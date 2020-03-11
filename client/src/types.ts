// Action types
// Product
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCT'
export const GET_CART = 'GET_CART'

// User
export const ADD_JWT_TOKEN = 'ADD_JWT_TOKEN'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOG_OUT = 'LOG_OUT'

// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A product
export type Product = {
  _id: string
  name: string
  description: string
  categories: string[]
  variants: string[]
  sizes: string[]
  img: string
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

export type GetAllProductsAction = {
  type: typeof GET_ALL_PRODUCTS
  payload: {
    products: any
  }
}

// User Actions

export type GetCartAction = {
  type: typeof GET_CART
  payload: {
    cart: Product[]
  }
}

export type ADDJWTTokenAction = {
  type: typeof ADD_JWT_TOKEN
  payload: {
    token: string | null
  }
}

export type LoadUserSuccessAction = {
  type: typeof LOAD_USER_SUCCESS
  payload: {
    user: any
    userLoaded: Boolean
  }
}

export type LogOutAction = {
  type: typeof LOG_OUT
  payload: {
    token: string | null
    user: any
    userLoaded: Boolean
  }
}

export type UiActions = ToggleDialogAction

// Use this union in reducer
export type ProductActions =
  | AddProductAction
  | RemoveProductAction
  | GetAllProductsAction

export type UserActions =
  | ADDJWTTokenAction
  | LoadUserSuccessAction
  | LogOutAction
  | GetCartAction

export type ProductState = {
  products: any
}

export type UserState = {
  token: string | null
  user: any
  userLoaded: Boolean
  cart: Product[]
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
