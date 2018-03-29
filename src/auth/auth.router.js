const express = require('express')
const router = express.Router()

const controller = require('./auth.controller')

router.route('/signin')
  .post((req, res) => {
    handleController(controller.signin(req.body), res)
  })

router.route('/signup')
  .post((req, res) => {
    handleController(controller.signup(req.body), res)
  })

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}

module.exports = router