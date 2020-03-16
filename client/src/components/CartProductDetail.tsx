import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import { CartProduct, AppState } from '../types'
import {
  decreaseQuantityFetch,
  manageProductInCartFetch,
  deleteProductInCartFetch,
} from '../redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flexShrink: 1,
    },
    card: {
      width: '90%',
      margin: '0 auto',
      boxShadow: 'none',
    },
    cardContent: {
      padding: '10px 0',
    },
  })
)

type CartProductProps = {
  product: CartProduct
}

const CartProductDetail = ({ product }: CartProductProps) => {
  const classes = useStyles()
  const productDetail = product.product
  const dispatch = useDispatch()

  const user = useSelector((state: AppState) => state.user)
  const token = user.token
  const userId = user.user?.id
  const productId = productDetail._id

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantityFetch(token, userId, productId, false))
  }

  const handleInCreaseQuantity = () => {
    dispatch(manageProductInCartFetch(token, userId, productId, true))
  }

  const handleDeleteProduct = () => {
    dispatch(deleteProductInCartFetch(token, userId, productId))
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        src={productDetail.img}
        title={productDetail.name}
      />
      <CardContent className={classes.cardContent}>
        <Link to={`/products/${productDetail._id}`}>
          <Typography
            className="product-name"
            variant="h6"
            color="textPrimary"
            component="p"
          >
            {productDetail.name}
          </Typography>
        </Link>
        <Typography variant="body1" color="textSecondary" component="p">
          {productDetail.price} EUR
        </Typography>
      </CardContent>
      <Button variant="outlined" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <Button variant="outlined">{product.quantity}</Button>
      <Button variant="outlined" onClick={handleInCreaseQuantity}>
        +
      </Button>
      <Typography
        variant="body2"
        className="delete-btn"
        onClick={handleDeleteProduct}
      >
        DELETE
      </Typography>
    </Card>
  )
}

export default CartProductDetail
