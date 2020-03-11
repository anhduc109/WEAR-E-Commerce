import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import { AppState } from './types'
import AdminHomePage from './pages/AdminHomePage'

const Routes = () => {
  const isAdmin = useSelector((state: AppState) => state.user.user?.isAdmin)

  return (
    <Switch>
      <Route exact path="/" component={isAdmin ? AdminHomePage : Home} />
      <Route exact path="/products/:productId" component={ProductDetail} />
    </Switch>
  )
}

export default Routes
