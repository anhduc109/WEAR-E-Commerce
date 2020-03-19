import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() =>
  createStyles({
    homeBtn: {
      border: '3px solid black',
      width: 150,
      fontWeight: 700,
    },
  })
)

const HomePage = () => {
  const classes = useStyles()
  return (
    <div className="home-wrapper">
      <Link to="/products?category=Man">
        <div className="home-left-btn">
          <Typography variant="h5">MAN </Typography>
          <ArrowBackIosIcon className="arrow-svg" />
        </div>
      </Link>
      <div className="home-text-component">
        <Typography variant="h2">NEW IN</Typography>
        <Typography variant="subtitle2">
          Explore week’s latest fashion of the <br />
          season curated for you. <br />
          Spring Summer Collection
        </Typography>
        <br />
        <Link to="/products">
          <Button variant="outlined" className={classes.homeBtn}>
            VIEW
          </Button>
        </Link>
      </div>
      <Link to="/products?category=Woman">
        <div className="home-right-btn">
          <ArrowForwardIosIcon className="arrow-svg" />
          <Typography variant="h5">WOMAN</Typography>
        </div>
      </Link>
    </div>
  )
}

export default HomePage
