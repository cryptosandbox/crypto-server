const express = require('express')
const router = express.Router()
const poloniexController = require('../../controllers/poloniex/poloniex.controller')

router.route('/currencies')
  .get((req, res) => {
    handleController(poloniexController.getCurrencies(), res)
  })

router.route('/')
  .get((req, res) => {
    handleController(poloniexController.getCombined('USDT'), res)
  })

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { res.status(500).send(reason) }
}

module.exports = router