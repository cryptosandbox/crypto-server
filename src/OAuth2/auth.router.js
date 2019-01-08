const express = require('express')
const router = express.Router()

const oAuth2Server = require('node-oauth2-server')
const OAuth2Error = require('node-oauth2-server/lib/error')

const passport = require('passport')
const Strategy = require('passport-http-bearer').Strategy

const controller = require('./auth.controller')
const model = require('./auth.model')
const userController = require('../api/user/user.controller.mongodb')

passport.use(new Strategy((bearerToken, callback) => {
  controller.findByToken(bearerToken)
    .then(token => {
      if (!token || !token.user) { return callback(null, false) }
      return callback(null, token.user)
    })
    .catch(reason => {
      return callback(reason)
    })
}))

module.exports = {
  initialize: (app) => {
    app.oauth = oAuth2Server({
      model: model,
      grants: ['password'],
      debug: true
    })

    router.route('/signin')
      .post(app.oauth.grant(), (req, res) => {
        res.send('signed in')
      })

    router.route('/signup')
      .post((req, res) => {
        handleController(userController.create(req.body), res)
      })

    router.route('/access')
      .post(passport.authenticate('bearer', { session: false }), (req, res) => {
        res.send('you have gained access')
      })

    app.use('/auth', router)

    app.use((err, req, res, next) => {
      if (err instanceof OAuth2Error) {
        if (err.code == 503) {
          res.status(401)
          next(err)
        }
      }
      next(err)
    })

    //app.use(app.oauth.errorHandler())

    return router
  }
}

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) {
    console.log("Code:", reason.code)
    if (reason.code == 11000) {
      res.status(409).send("User already exists")
    } else {
      res.status(500).send("Server error")
    }
  }
}