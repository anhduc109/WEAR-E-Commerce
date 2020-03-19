import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Badge,
  // TextField,
  Drawer,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch, useSelector } from 'react-redux'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import jwt from 'jsonwebtoken'
import { Link, useLocation } from 'react-router-dom'

import LoginWithGoogle from './LoginWithGoogle'
import { logOut } from '../redux/actions/user'
import AdminMenuDrawer from './AdminMenuDrawer'
import UserMenuDrawer from './UserMenuDrawer'
import { countQuantity } from '../lib/cart/cart'
import { AppState, User } from '../types'

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
        background: location.pathname === '/cart' ? 'white' : 'transparent',
        boxShadow: 'none',
      },
      toolBar: {
        height: 100,
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
      drawer: {
        boxShadow: 'none',
        width: '300px',
      },
    })
  )
  const classes = useStyles()

  const existingToken = JSON.parse(localStorage.getItem('token') || 'null')
  const user: any = jwt.decode(existingToken)

  const userInRedux: User | null = useSelector(
    (state: AppState) => state.user.user
  )
  const cart = useSelector((state: AppState) => state.user.cart)

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={classes.root}>
      <Drawer
        BackdropProps={{ invisible: true }}
        elevation={0}
        open={isDrawerOpen}
        anchor="left"
        onClose={() => setIsDrawerOpen(false)}
      >
        {user?.isAdmin ? <AdminMenuDrawer /> : <UserMenuDrawer />}
      </Drawer>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolBar}>
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
            <Typography variant="h3">WEAR</Typography>
          </Link>
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
