const express = require('express')
const router = express.Router()
const transactionController = ('./transaction.controller')

router.route('/')
  .get((req, res) => {
    handleController(transactionController.readAll(), res)
  })
  .post((req, res) => {
    handleController(transactionController.create(req.body))
  })

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}

module.exports = router