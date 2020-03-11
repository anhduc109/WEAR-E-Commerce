import express from 'express'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongoose from 'mongoose'
import passport from 'passport'
import bluebird from 'bluebird'

// Secrets
import { MONGODB_URI } from './util/secrets'

// Routes
import productRouter from './routers/product'
import userRouter from './routers/user'

// Middlewares
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import unless from './util/unless'
import authJWT from './middlewares/authJWT'

import './config/passport'

const app = express()
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('Its finee')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// Express configuration
app.set('port', process.env.PORT || 3000)

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Cross origin enabled
app.use(cors())

// Passport init
app.use(passport.initialize())
app.use(passport.session())

// Secured every API endpoints with authJWT
const excludedPaths = [/v1\/users\/(google\-)?authenticate/, /v1\/products/]
app.use('/api', apiContentType, unless(excludedPaths, authJWT))

// Use product router
app.use('/api/v1/products', productRouter)

// User user router
app.use('/api/v1/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
