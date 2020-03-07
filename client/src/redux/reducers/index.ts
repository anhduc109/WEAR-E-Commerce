import { combineReducers } from 'redux'

import user from './user'
import product from './product'
import ui from './ui'

const createRootReducer = () =>
  combineReducers({
    user,
    product,
    ui,
  })

export default createRootReducer
