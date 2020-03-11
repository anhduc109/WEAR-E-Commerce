import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch, useSelector } from 'react-redux'
import jwt from 'jsonwebtoken'

import LoginWithGoogle from './LoginWithGoogle'
import { logOut } from '../redux/actions/user'
import { AppState } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: 'transparent',
      boxShadow: 'none',
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

  // const existingToken = JSON.parse(localStorage.getItem('token') || 'null')
  // const user: any = jwt.decode(existingToken)

  const user = useSelector((state: AppState) => state.user.user)

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.root}>
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
          {user ? (
            <>
              <h1>{`Hello ${user.username}`}</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogOut}
              >
                Log out
              </Button>
            </>
          ) : (
            <LoginWithGoogle />
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
