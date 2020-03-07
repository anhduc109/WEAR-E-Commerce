import React, { useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { GoogleLogin } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { addJWTToken, loadUser } from '../redux/actions'
import { AppState } from '../types'

const clientId =
  '111698224932-mv4o2t3q3ctr4hr0atpta4no96avbf2p.apps.googleusercontent.com'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

const NavBar = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const user = useSelector((state: AppState) => state.user.user)

  useEffect(() => {
    const existingToken = JSON.parse(localStorage.getItem('token') || 'null')
    if (existingToken) {
      dispatch(addJWTToken(existingToken))
    }
    dispatch(loadUser(existingToken))
  }, [])

  const responseGoogle = async (response: any) => {
    let res = await axios.post(
      'http://localhost:3000/api/v1/users/google-authenticate',
      { id_token: response.tokenObj.id_token }
    )
    dispatch(addJWTToken(res.data.token))
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Shoppie
          </Typography>
          {/* {user ? (
            <h1>Hello, {user.username}</h1>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          )} */}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
