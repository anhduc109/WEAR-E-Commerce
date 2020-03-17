import React from 'react'
import { Typography } from '@material-ui/core'

const UserMenuDrawer = () => {
  return (
    <div className="drawer-wrapper">
      <Typography className="cursor-pointer" variant="h4">
        WOMAN
      </Typography>
      <Typography className="cursor-pointer" variant="h4">
        MAN
      </Typography>
      <br />
      <Typography className="cursor-pointer" variant="h5">
        NEW IN
      </Typography>
      <br />
      <Typography className="cursor-pointer" variant="h6">
        COLLECTION
      </Typography>
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
