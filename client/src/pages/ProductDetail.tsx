import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  List,
  ListItem,
  Button,
  Box,
  ListItemText,
} from '@material-ui/core'

import { Product, AppState, baseURL, CartProduct } from '../types'
import { manageProductInCartFetch } from '../redux/actions'

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
  const [disabled, setDisabled] = useState<boolean>(false)
  const dispatch = useDispatch()

  const { productId } = useParams()
  const classes = useStyles()

  const userLoaded = useSelector((state: AppState) => state.user.userLoaded)
  const token = useSelector((state: AppState) => state.user.token)
  const user = useSelector((state: AppState) => state.user.user)
  const cart = useSelector((state: AppState) => state.user.cart)

  const fetchProduct = async (productId: any) => {
    let res = await axios.get(`${baseURL}/products/${productId}`)
    setProduct(res.data)
  }

  const handleExistedInCart = useCallback(() => {
    if (userLoaded === true && cart.length === 0) {
      setDisabled(false)
    } else {
      cart.some((cartProduct: CartProduct) => {
        if (cartProduct.product._id === productId) {
          return setDisabled(true)
        } else return setDisabled(false)
      })
    }
  }, [cart, productId, userLoaded])

  useEffect(() => {
    fetchProduct(productId)

    // Handle Add To Cart Button
    if (userLoaded === true) {
      setDisabled(false)
    } else setDisabled(true)

    handleExistedInCart()
  }, [productId, userLoaded, handleExistedInCart])

  const handleAddToCart = () => {
    dispatch(manageProductInCartFetch(token, user?.id, productId, true))
  }

  return product ? (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={7}>
          <img
            className="responsive-img"
            src={product.img}
            alt={product.name}
          />
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
            disabled={disabled}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          {userLoaded && disabled === true && (
            <Typography component="div" variant="body2" color="textSecondary">
              <Box fontStyle="italic" textAlign="center" m={1}>
                This item is in Cart
              </Box>
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  ) : (
    <h1>Product not found</h1>
  )
}

export default ProductDetail
