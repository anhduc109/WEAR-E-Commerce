import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import { fetchAllProduct } from '../redux/actions'
import { AppState } from '../types'

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

const ProductsList = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const token = useSelector((state: AppState) => state.user.token)
  const products = useSelector((state: AppState) => state.product.products)

  useEffect(() => {
    dispatch(fetchAllProduct(token))
  }, [])

  return (
    <Grid container className={classes.root} spacing={2}>
      {products.map((product: any) => {
        return (
          <Grid key={product._id} item xs={3}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                src={product.img}
                title={product.name}
              />
              <CardContent className={classes.cardContent}>
                <Link to={`/products/${product._id}`}>
                  <Typography
                    className="product-name"
                    variant="h6"
                    color="textPrimary"
                    component="p"
                  >
                    {product.name}
                  </Typography>
                </Link>
                <Typography variant="body1" color="textSecondary" component="p">
                  {product.price} EUR
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProductsList
