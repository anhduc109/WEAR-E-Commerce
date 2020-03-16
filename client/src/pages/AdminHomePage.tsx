import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    adminList: {
      paddingLeft: '20%',
      paddingRight: '20%',
    },
  })
)

const AdminHomePage = () => {
  const classes = useStyles()
  return (
    <div className="page-wrapper">
      <Typography variant="h3" align="center">
        Welcome home, Admin
      </Typography>
      <Typography variant="h4" align="center">
        Tasks for today:
      </Typography>
      <br />
      <List className={classes.adminList}>
        <ListItem button>
          <Typography variant="h5" align="center">
            Ban some users
          </Typography>
        </ListItem>
        <Divider />
        <Link to="/admin/products">
          <ListItem button>
            <Typography variant="h5" align="center">
              Create new products
            </Typography>
          </ListItem>
        </Link>
        <Divider />
        <ListItem button>
          <Typography variant="h5" align="center">
            Manage some products
          </Typography>
        </ListItem>
        <Divider />
      </List>
      <br />
      <Typography variant="h6" color="textSecondary" align="center">
        Tips: You can also click on the hamburger menu to manage users or
        products
      </Typography>
    </div>
  )
}

export default AdminHomePage
