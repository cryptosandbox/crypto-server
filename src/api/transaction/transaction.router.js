const express = require('express')
const router = express.Router()
const transactionController = require('./transaction.controller')

router.route('/')
  .get((req, res) => {
    handleController(transactionController.readAll(), res)
  })
  .post((req, res) => {
    console.log('POST transaction')
    console.log(transactionController)
    handleController(transactionController.create(req.body), res)
  })

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}

module.exports = router