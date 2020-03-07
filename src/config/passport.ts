import passport from 'passport'
// import passportLocal from 'passport-local'
// import passportFacebook from 'passport-facebook'

// import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

// const LocalStrategy = passportLocal.Strategy
// const FacebookStrategy = passportFacebook.Strategy

const GoogleTokenStrategy = require('passport-google-id-token')

const GOOGLE_CLIENT_ID =
  '111698224932-mv4o2t3q3ctr4hr0atpta4no96avbf2p.apps.googleusercontent.com'

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async function(parsedToken: any, googleId: string, done: Function) {
      const { payload } = parsedToken
      console.log(payload)

      try {
        const user = await User.findOne({ email: payload.email }).exec()
        if (user) {
          return done(null, user)
        }

        const newUser = await User.create({
          email: payload.email,
          isAdmin: payload.email === 'ducpham1098@gmail.com',
          username: payload.name,
          firstName: payload.given_name,
          lastName: payload.family_name,
          password: '123',
        })

        done(null, newUser)
      } catch (error) {
        done(error)
      }
    }
  )
)
