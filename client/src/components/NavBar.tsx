import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Badge,
  TextField,
  Drawer,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch, useSelector } from 'react-redux'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import { Link } from 'react-router-dom'

import LoginWithGoogle from './LoginWithGoogle'
import { logOut } from '../redux/actions/user'
import MenuDrawer from '../components/MenuDrawer'
import { countQuantity } from '../lib/cart/cart'
import { AppState, User } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: 'transparent',
      boxShadow: 'none',
    },
    searchField: {
      marginRight: '5%',
      width: '300px',
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  // const existingToken = JSON.parse(localStorage.getItem('token') || 'null')
  // const user: any = jwt.decode(existingToken)

  const user: User | null = useSelector((state: AppState) => state.user.user)
  const cart = useSelector((state: AppState) => state.user.cart)

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={classes.root}>
      <Drawer
        open={isDrawerOpen}
        anchor="left"
        onClose={() => setIsDrawerOpen(false)}
      >
        {user?.isAdmin && <MenuDrawer />}
      </Drawer>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.title}>
            <Typography variant="h4">No Name</Typography>
          </Link>
          {/* <TextField
            className={classes.searchField}
            label="Search"
            color="secondary"
          /> */}
          {user ? (
            <>
              <Typography variant="h6">Hi, {user.username}</Typography>
              <Link to="/cart">
                <IconButton className={classes.marginButton}>
                  <Badge badgeContent={countQuantity(cart)}>
                    <LocalMallOutlinedIcon />
                  </Badge>
                </IconButton>
              </Link>
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
