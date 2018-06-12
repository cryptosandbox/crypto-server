const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('./user.controller')

// router.use(passport.authenticate('bearer', { session: false }))

router.route('/')
  .get((req, res) => {
    handleController(controller.read(req.user.id), res)
  })
  .post((req, res) => {
    handleController(controller.create(req.body), res)
  })
  .delete((req, res) => {
    handleController(controller.deleteAll(), res)
  })

router.route('/all')
  .get((req, res) => {
    handleController(controller.readAll(), res)
  })

router.route('/full')
  .get((req, res) => {
    handleController(controller.read(req.user.id), res)
  })

router.route('/:id')
  .get((req, res) => {
    handleController(controller.read(req.params.id), res)
  })
  .put((req, res) => {
    handleController(controller.update(req.params.id, req.body), res)
  })
  .delete((req, res) => {
    handleController(controller.delete(req.params.id), res)
  })

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}

module.exports = router