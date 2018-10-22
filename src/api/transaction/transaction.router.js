const express = require('express')
const router = express.Router()
const controller = require('./transaction.controller.mongodb')

router.route('/')
  .get((req, res) => {
    handleController(controller.readAll(), res)
  })
  .post((req, res) => {
    handleController(controller.create(req.body), res)
  })
  .delete((req, res) => {
    handleController(controller.delete(), res)
  })

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { console.error(reason); res.status(500).send(reason) }
}

module.exports = router