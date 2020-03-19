import React from 'react'
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    listDrawer: {
      width: 300,
    },
    headerDrawer: {
      textAlign: 'center',
      paddingBottom: 5,
    },
  })
)

const MenuDrawer = () => {
  const classes = useStyles()

  return (
    <div className={classes.listDrawer} role="presentation">
      <List>
        <Typography variant="h6" className={classes.headerDrawer}>
          Management Menu
        </Typography>
        <Link to="/admin">
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/admin/products">
          <ListItem button>
            <ListItemText primary="Create new products" />
          </ListItem>
        </Link>
        <Divider />
        <ListItem button>
          <ListItemText primary="Manage products" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Manage users" />
        </ListItem>
        <Divider />
      </List>
    </div>
  )
}

export default MenuDrawer
