const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('./transaction.controller.mongodb')

router.use(passport.authenticate('bearer', { session: false }))

router.route('/')
  .get((req, res) => {
    handle(controller.readAll(), res)
  })
  .post((req, res) => {
    handle(controller.create(req.user.id, req.body), res)
  })
  .delete((req, res) => {
    handle(controller.delete(), res)
  })

router.route('/:uid')
  .get((req, res) => {
    handle(controller.read(req.uid), res)
  })

async function handle(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { console.error(reason); res.status(500).send("Server error") }
}

module.exports = router