import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Grid, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { countQuantity, countTotalPrice } from '../lib/cart/cart'
import { AppState } from '../types'
import CartProductDetail from '../components/CartProductDetail'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      minWidth: '176px',
      maxWidth: '232px',
      minHeight: '45px',
      maxWeight: '60px',
      boxShadow: 'none',
    },
  })
)

const UserCart = () => {
  const classes = useStyles()
  const cart = useSelector((state: AppState) => state.user.cart)

  return (
    <div className="cart-wrapper">
      <Typography variant="h4">SHOPPING BAG</Typography>
      <Typography variant="body1" color="textSecondary">
        {countQuantity(cart)} items
      </Typography>
      <Grid className="cart-product-wrapper" container spacing={3}>
        {cart.map(product => {
          return (
            <Grid item xs={3} key={product._id}>
              <CartProductDetail product={product} />
            </Grid>
          )
        })}
      </Grid>
      <Grid container className="cart-price-wrapper">
        <Grid item xs={4}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            Go back
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5">
            TOTAL: {countTotalPrice(cart)} EUR
          </Typography>
          <Typography variant="body2" color="textSecondary">
            * Including VAT
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserCart
