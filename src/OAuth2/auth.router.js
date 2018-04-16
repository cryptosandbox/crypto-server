const express = require('express')
const router = express.Router()
const oAuth2Server = require('node-oauth2-server')

const controller = require('./auth.controller')
const model = require('./auth.model')
const userController = require('../api/user/user.controller')

module.exports = {
  initialize: (app) => {
    app.oauth = oAuth2Server({
      model: model,
      grants: ['password'],
      debug: true
    })

    app.use(app.oauth.errorHandler())

    router.post('/signin', app.oauth.grant(), (req, res) => { res.send('signed in') })

    router.route('/signup')
      .post((req, res) => {
        handleController(userController.create(req.body), res)
      })
    
    router.post('/access', app.oauth.authorise(), (req, res) => { console.log('got here'); res.send('you have gained access') })

    app.use('/auth', router)

    return router
  }
}

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}