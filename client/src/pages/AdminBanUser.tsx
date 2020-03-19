import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import axios from 'axios'

const AdminBanUser = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {})

  return (
    <div className="page-wrapper">
      <Typography variant="h3" align="center">
        Users List
      </Typography>
    </div>
  )
}

export default AdminBanUser
