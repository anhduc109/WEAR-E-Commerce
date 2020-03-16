import React from 'react'
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
import { CartProduct, Product } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flexShrink: 1,
    },
    card: {
      width: '80%',
      margin: '0 auto',
      boxShadow: 'none',
    },
    cardContent: {
      padding: '10px 0',
    },
  })
)

const CartProductDetail = ({ product }: any) => {
  const classes = useStyles()
  const productDetail = product.product

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
      <Button variant="outlined">-</Button>
      <Button variant="outlined" disabled>
        {product.quantity}
      </Button>
      <Button variant="outlined">+</Button>
    </Card>
  )
}

export default CartProductDetail
