import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Badge,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch, useSelector } from 'react-redux'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'

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
    marginButton: {
      marginLeft: 10,
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
          <Typography variant="h4" className={classes.title}>
            No Name
          </Typography>
          {user ? (
            <>
              <Typography variant="h6">Hi, {user.username}</Typography>
              <IconButton className={classes.marginButton}>
                <Badge badgeContent={3}>
                  <LocalMallOutlinedIcon />
                </Badge>
              </IconButton>
              <Button
                className={classes.marginButton}
                variant="outlined"
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
