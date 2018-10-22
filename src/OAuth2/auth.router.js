const express = require('express')
const router = express.Router()
const oAuth2Server = require('node-oauth2-server')
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

    app.use(app.oauth.errorHandler())

    router.route('/signin')
      .post(app.oauth.grant(), (req, res) => {
        console.log('signed in')
        res.send('signed in')
      })

    router.route('/signup')
      .post((req, res) => {
        handleController(userController.create(req.body), res)
      })
    
    router.route('/access')
      .post(passport.authenticate('bearer', { session: false }), (req, res) => { 
        console.log("User:", req.user)
        res.send('you have gained access') 
      })

    app.use('/auth', router)

    return router
  }
}

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}