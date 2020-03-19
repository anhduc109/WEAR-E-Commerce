import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'

import { fetchAllProduct, fetchCategoryProduct } from '../redux/actions'
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
    mainCard: {
      width: '60%',
      margin: '0 auto',
      boxShadow: 'none',
    },
    cardContent: {
      padding: '10px 0',
    },
  })
)

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const ProductsList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const token = useSelector((state: AppState) => state.user.token)
  const products = useSelector((state: AppState) => state.product.products)

  const query = useQuery()
  const category = query.get('category')

  useEffect(() => {
    if (category !== null) {
      dispatch(fetchCategoryProduct(token, category))
    } else {
      dispatch(fetchAllProduct(token))
    }
  }, [token, dispatch, category])

  return (
    <>
      {(category === 'Man' || category === 'Woman') && products.length > 1 && (
        <div className="category-header-wrapper">
          <Card className={classes.mainCard}>
            <Link to={`/products/${products[0]._id}`}>
              <CardMedia
                component="img"
                src={products[0].img}
                title={products[0].name}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  className="product-name"
                  variant="h6"
                  color="textPrimary"
                  component="p"
                >
                  {products[0].name}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  {products[0].price} EUR
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </div>
      )}
      <Grid container className={classes.root} spacing={2}>
        {products.slice(1).map((product: any) => {
          return (
            <Grid key={product._id} item xs={3}>
              <Card className={classes.card}>
                <Link to={`/products/${product._id}`}>
                  <CardMedia
                    component="img"
                    src={product.img}
                    title={product.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className="product-name"
                      variant="h6"
                      color="textPrimary"
                      component="p"
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {product.price} EUR
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default ProductsList
