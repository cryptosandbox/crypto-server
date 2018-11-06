const express = require('express')
const router = express.Router()
const passport = require('passport')

const userController = require('../user/user.controller.mongodb')

//router.use(passport.authenticate('bearer', { session: false }))

router.route('/users')
  .get((req, res) => {
    handle(userController.readAll(), res)
  })
  .delete((req, res) => {
    handle(userController.deleteAll(), res)
  })

router.route('/users/:id')
  .get((req, res) => {
    handle(userController.read(req.id), res)
  })
  .delete((req, res) => {
    handle(userController.delete(req.id), res)
  })


async function handle(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { console.error(reason); res.status(500).send("Server error") }
}

module.exports = router