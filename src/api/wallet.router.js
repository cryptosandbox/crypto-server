const express = require('express')
const controller = require('../controllers/wallet/wallet.controller')

controller.connect()

const router = express.Router()

router.route('/')
  .get((req, res) => {
    // handleController(controller.readAll(), res)
    handleControllerAsync(controller.readAll(), res)
  })
  .post((req, res) => {
    handleController(controller.create(req.body), res)
  })
  .delete((req, res) => {
    handleController(controller.deleteAll(), res)
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

function handleController(controllerPromise, res) {
  controllerPromise
    .then(data => res.json(data))
    .catch(reason => res.status(500).send(reason))
}

async function handleControllerAsync(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}

module.exports = router