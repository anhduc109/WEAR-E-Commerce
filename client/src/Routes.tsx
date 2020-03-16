import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import { AppState } from './types'
import AdminHomePage from './pages/AdminHomePage'
import AdminCreateProduct from './pages/AdminCreateProduct'
import UserCart from './pages/UserCart'

const Routes = () => {
  const isAdmin = useSelector((state: AppState) => state.user.isAdmin)
  const userLoaded = useSelector((state: AppState) => state.user.userLoaded)
  return (
    <Switch>
      <Route exact path="/" component={isAdmin ? AdminHomePage : Home} />
      {!isAdmin && <Redirect from="/admin/products" to="/" />}
      <Route path="/admin/products" component={AdminCreateProduct} />
      <Route exact path="/products/:productId" component={ProductDetail} />
      {userLoaded ? (
        <Route path="/cart" component={UserCart} />
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  )
}

export default Routes
