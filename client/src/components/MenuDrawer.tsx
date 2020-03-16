import React from 'react'
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
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
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Create new products" />
        </ListItem>
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
