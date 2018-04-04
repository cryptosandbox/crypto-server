const express = require('express')
const router = express.Router()
const oAuth2Server = require('node-oauth2-server')

const controller = require('./auth.controller')
const model = require('./auth.model')

module.exports = {
  initialize: (app, router) => {
    app.oauth = oAuth2Server({
      model: model,
      grants: ['password'],
      debug: true
    })

    app.use(app.oauth.errorHandler())

    router.route('/signin')
      .post(app.oauth.grant())

    router.route('/signup')
      .post((req, res) => {
        handleController(model.saveUser(req.body), res)
      })
    
    return router
  }
}

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}