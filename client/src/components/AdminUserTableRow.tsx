import React from 'react'
import { Button, TableCell, TableRow } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const AdminUserTableRow = ({ user, handleBanOrUnbanOnClick }: any) => {
  const useStyles = makeStyles(theme =>
    createStyles({
      greenText: {
        color: 'green',
      },
      redText: {
        color: 'red',
      },
      banBtn: {
        boxShadow: 'none',
      },
      text: {
        textDecoration: user.isBanned === true ? 'line-through' : 'none',
      },
    })
  )

  const classes = useStyles()
  return (
    <TableRow hover>
      <TableCell component="th" scope="row" className={classes.text}>
        {user.username}
      </TableCell>
      <TableCell className={classes.text}>{user.cart.length}</TableCell>
      <TableCell className={classes.text}>{user.email}</TableCell>
      <TableCell className={classes.text}>{user.firstName}</TableCell>
      <TableCell className={classes.text}>{user.lastName}</TableCell>
      <TableCell
        className={user.isBanned === true ? classes.redText : classes.greenText}
      >
        {user.isBanned === true ? 'Banned' : 'Normal'}
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          className={classes.banBtn}
          color="secondary"
          onClick={() => handleBanOrUnbanOnClick(user._id)}
        >
          Ban
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default AdminUserTableRow
