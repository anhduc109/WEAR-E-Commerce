import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'

import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import { AppState } from './types'
import AdminHomePage from './pages/AdminHomePage'
import AdminCreateProduct from './pages/AdminCreateProduct'
import UserCart from './pages/UserCart'

const Routes = () => {
  const existingToken = JSON.parse(localStorage.getItem('token') || 'null')
  const user: any = jwt.decode(existingToken)
  // const isAdmin = useSelector((state: AppState) => state.user.isAdmin)
  const userLoaded = useSelector((state: AppState) => state.user.userLoaded)
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={user && user.isAdmin ? AdminHomePage : Home}
      />
      <Route exact path="/products/:productId" component={ProductDetail} />
      {user ? <Route path="/cart" component={UserCart} /> : <Redirect to="/" />}
      {user && user.isAdmin ? (
        <Route path="/admin/products" component={AdminCreateProduct} />
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  )
}

export default Routes
