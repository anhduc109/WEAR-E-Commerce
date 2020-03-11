import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { Product } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    detailWrapper: {
      padding: '80px 0',
    },
  })
)

const ProductDetail = () => {
  const [product, setProduct] = useState<Product>()
  const { productId } = useParams()
  const classes = useStyles()

  const fetchProduct = async (productId: any) => {
    let res = await axios.get(
      `http://localhost:3000/api/v1/products/${productId}`
    )
    setProduct(res.data)
  }

  useEffect(() => {
    fetchProduct(productId)
  })

  return product ? (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <img className="responsive-img" src={product?.img}></img>
        </Grid>
        <Grid item xs={5} className={classes.detailWrapper}>
          <h1>Hello</h1>
        </Grid>
      </Grid>
    </div>
  ) : (
    <h1>Product not found</h1>
  )
}

export default ProductDetail
