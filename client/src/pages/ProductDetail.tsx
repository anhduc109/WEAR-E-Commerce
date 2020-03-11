import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  List,
  ListItem,
  Button,
  ListItemText,
} from '@material-ui/core'

import { Product, AppState } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    detailWrapper: {
      padding: '10% 5%',
    },
    button: {
      margin: '0 auto',
      width: '100%',
      boxShadow: 'none',
    },
  })
)

const ProductDetail = () => {
  const [product, setProduct] = useState<Product>()
  const { productId } = useParams()
  const classes = useStyles()

  const userLoaded = useSelector((state: AppState) => state.user.userLoaded)

  const fetchProduct = async (productId: any) => {
    let res = await axios.get(
      `http://localhost:3000/api/v1/products/${productId}`
    )
    setProduct(res.data)
  }

  useEffect(() => {
    fetchProduct(productId)
  }, [])

  console.log(userLoaded)

  return product ? (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={7}>
          <img className="responsive-img" src={product?.img}></img>
        </Grid>
        <Grid item xs={5} className={classes.detailWrapper}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6">{product.price} EUR</Typography>
          <br />
          <Typography variant="h6">{product.description}</Typography>
          <br />
          <Typography variant="h6">Sizes</Typography>
          <List component="nav">
            {product.sizes.map(size => {
              return (
                <ListItem button key={size}>
                  <ListItemText primary={size} />
                </ListItem>
              )
            })}
          </List>
          <Typography variant="h6">Colors</Typography>
          <List component="nav">
            {product.variants.map(color => {
              return (
                <ListItem button key={color}>
                  <ListItemText primary={color} />
                </ListItem>
              )
            })}
          </List>
          <br />
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disabled={userLoaded == true ? false : true}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </div>
  ) : (
    <h1>Product not found</h1>
  )
}

export default ProductDetail
