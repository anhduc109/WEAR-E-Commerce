import React, { useEffect } from 'react'
import Routes from './Routes'
import { useDispatch } from 'react-redux'
import jwt from 'jsonwebtoken'

import './App.css'
import NavBar from './components/NavBar'
import { addJWTToken, loadUser } from './redux/actions'

function App() {
  const existingToken = JSON.parse(localStorage.getItem('token') || 'null')

  const dispatch = useDispatch()

  useEffect(() => {
    // let testing = userLoaded
    if (existingToken) {
      const decodedExistingToken: any = jwt.decode(existingToken)
      if (decodedExistingToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
      } else {
        //this condition will be true unless the token expires
        dispatch(addJWTToken(existingToken))
        dispatch(loadUser(decodedExistingToken))
      }
    }
  }, [existingToken, dispatch])
  return (
    <>
      <NavBar />
      <Routes />
    </>
  )
}

export default App
