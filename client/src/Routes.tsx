import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products/:productId" component={ProductDetail} />
  </Switch>
)

export default Routes
