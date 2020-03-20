import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import axios from 'axios'

import { AppState, User } from '../types'
import AdminUserTableRow from '../components/AdminUserTableRow'

const AdminBanUser = () => {
  const [users, setUsers] = useState([])
  const userEmail = useSelector((state: AppState) => state.user.user?.email)
  const token = useSelector((state: AppState) => state.user.token)

  async function fetchUser() {
    if (token !== '') {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.get(
        'https://e-clothing-api.herokuapp.com/api/v1/users',
        config
      )
      setUsers(res.data)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [token])

  const handleBanOrUnbanOnClick = async (userId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    await axios.put(
      'https://e-clothing-api.herokuapp.com/api/v1/users',
      { userId },
      config
    )

    const res = await axios.get(
      'https://e-clothing-api.herokuapp.com/api/v1/users',
      config
    )
    setUsers(res.data)
  }

  return (
    <div className="page-wrapper">
      <Typography variant="h3" align="center">
        Users List
      </Typography>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Products in Cart</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Ban Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .filter((user: any) => user.email !== userEmail)
            .map((user: any) => {
              return (
                <AdminUserTableRow
                  key={user.email}
                  user={user}
                  handleBanOrUnbanOnClick={handleBanOrUnbanOnClick}
                />
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminBanUser
