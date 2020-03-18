import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import { addJWTToken, loadUser, fetchCart } from '../redux/actions'

const clientId =
  '111698224932-mv4o2t3q3ctr4hr0atpta4no96avbf2p.apps.googleusercontent.com'

const LoginWithGoogle = () => {
  const dispatch = useDispatch()

  const responseGoogle = async (response: any) => {
    let res = await axios.post(
      `https://e-clothing-api.herokuapp.com/api/v1/users/google-authenticate`,
      { id_token: response.tokenObj.id_token }
    )
    dispatch(addJWTToken(res.data.token))
    const decodedToken: any = jwt.decode(res.data.token)
    dispatch(loadUser(decodedToken))
    dispatch(fetchCart(res.data.token, decodedToken.id))
  }

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default LoginWithGoogle
