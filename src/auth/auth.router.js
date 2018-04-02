const express = require('express')
const router = express.Router()
const oAuth2Server = require('node-oauth2-server')

const controller = require('./auth.controller')
const model = require('./auth.model')

router.route('/signin')
  .post(app.oauth.grant())

router.route('/signup')
  .post((req, res) => {
    controller.signup(req.body)
  })

function initialize(app) {
  app.oauth = oAuth2Server({
    model: oAuthModel,
    grants: ['password'],
    debug: true
  })

  app.use('/auth', router)
  app.use(expressApp.oauth.errorHandler())
}

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}

module.exports = router