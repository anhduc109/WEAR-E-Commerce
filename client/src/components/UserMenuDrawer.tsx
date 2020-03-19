import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const UserMenuDrawer = () => {
  return (
    <div className="drawer-wrapper">
      <Link to="/products/?category=Woman">
        <Typography className="cursor-pointer" variant="h4">
          WOMAN
        </Typography>
      </Link>
      <Link to="/products/?category=Man">
        <Typography className="cursor-pointer" variant="h4">
          MAN
        </Typography>
      </Link>
      <br />
      <Typography className="cursor-pointer" variant="h5">
        NEW IN
      </Typography>
      <br />
      <Link to="/">
        <Typography className="cursor-pointer" variant="h6">
          ALL PRODUCTS
        </Typography>
      </Link>
      <br />
      <br />
      <Typography className="cursor-pointer" variant="h4">
        KIDS
      </Typography>
      <br />
      <Typography className="cursor-pointer" variant="h4">
        SHOES & BAGS
      </Typography>
    </div>
  )
}

export default UserMenuDrawer
