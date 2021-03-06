import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Typography,
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'
// import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import { useFormik } from 'formik'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import axios from 'axios'
import * as Yup from 'yup'

import { baseURL, AppState } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      paddingBottom: 10,
      width: '60%',
      margin: '0 auto',
    },
    submitBtn: {
      marginTop: 16,
      width: '60%',
      boxShadow: 'none',
    },
    formLabel: {
      textAlign: 'left',
      paddingBottom: 10,
    },
  })
)

const AdminCreateProduct = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>()
  const token = useSelector((state: AppState) => state.user.token)

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categories: ['Man'],
      variants: [],
      price: 0,
      img: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Too short')
        .max(50, 'Too long'),
      description: Yup.string()
        .min(2, 'Too short')
        .max(500, 'Too long'),
      categories: Yup.string()
        .min(2, 'Too short')
        .max(50, 'Too long'),
      variants: Yup.string()
        .min(2, 'Too short')
        .max(50, 'Too long'),
      img: Yup.string().min(2, 'Too short'),
      price: Yup.number()
        .min(1, 'Too small')
        .max(99999999, 'Too big'),
    }),
    onSubmit: async values => {
      let res = await axios.post(`${baseURL}/admin/products`, values, config)
      console.log(config)
      res.data.name ? setIsSuccessful(true) : setIsSuccessful(false)
    },
  })

  const classes = useStyles()

  return (
    <div className="page-wrapper">
      <Typography variant="h3" align="center">
        Create product
      </Typography>
      <form onSubmit={formik.handleSubmit} className="form-center">
        <TextField
          id="name"
          name="name"
          onChange={formik.handleChange}
          label="Name"
          color="secondary"
          className={classes.input}
        />
        {formik.touched.name && formik.errors.name ? (
          <Typography variant="body1">{formik.errors.name}</Typography>
        ) : null}
        <br />
        <TextField
          id="description"
          name="description"
          multiline
          rows="4"
          onChange={formik.handleChange}
          label="Description"
          color="secondary"
          className={classes.input}
        />
        {formik.touched.description && formik.errors.description ? (
          <Typography variant="body1">{formik.errors.description}</Typography>
        ) : null}
        <br />
        <br />
        <RadioGroup
          aria-label="gender"
          id="categories[0]"
          name="categories[0]"
          value={formik.values.categories[0]}
          onChange={formik.handleChange}
          className={classes.input}
        >
          <FormLabel className={classes.formLabel}>Gender</FormLabel>
          <FormControlLabel value="Man" control={<Radio />} label="Man" />
          <FormControlLabel value="Woman" control={<Radio />} label="Woman" />
        </RadioGroup>
        <TextField
          id="categories[1]."
          name="categories[1]"
          onChange={formik.handleChange}
          label="Categories"
          color="secondary"
          className={classes.input}
        />
        {formik.touched.categories && formik.errors.categories ? (
          <Typography variant="body1">{formik.errors.categories}</Typography>
        ) : null}
        <br />
        <TextField
          id="variants[0]"
          name="variants[0]"
          onChange={formik.handleChange}
          label="Variants"
          color="secondary"
          className={classes.input}
        />
        {formik.touched.variants && formik.errors.variants ? (
          <Typography variant="body1">{formik.errors.variants}</Typography>
        ) : null}
        <br />
        <TextField
          id="price"
          name="price"
          onChange={formik.handleChange}
          label="Price"
          color="secondary"
          className={classes.input}
        />
        {formik.touched.price && formik.errors.price ? (
          <Typography variant="body1">{formik.errors.price}</Typography>
        ) : null}
        <br />
        <TextField
          id="img"
          name="img"
          onChange={formik.handleChange}
          label="Image URL"
          color="secondary"
          className={classes.input}
        />
        {formik.touched.img && formik.errors.img ? (
          <Typography variant="body1">{formik.errors.img}</Typography>
        ) : null}
        <br />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.submitBtn}
        >
          Submit
        </Button>
        {isSuccessful === true && (
          <Typography className="success-alert" variant="h6">
            Success
          </Typography>
        )}
        {isSuccessful === false && <Typography variant="h6">Failed</Typography>}
      </form>
    </div>
  )
}

export default AdminCreateProduct
