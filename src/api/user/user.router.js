const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('./user.controller.mongodb')

router.use(passport.authenticate('bearer', { session: false }))

router.route('/')
  .get((req, res) => {
    handle(controller.read(req.user.id), res)
  })
  .delete((req, res) => {
    handle(controller.delete(req.user.id), res)
  })

async function handle(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { 
    console.error(reason)
    if (reason == "Error: User not found") {
      res.status(404).send("User not found")
    } else {
      res.status(500).send("Server error")
    }
  }
}

module.exports = router