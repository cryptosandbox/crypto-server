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

router.route('/chart/:symbol')
  .get((req, res) => {
    handleController(poloniexController.getChart(req.params.symbol), res)
  })

async function handleController(controllerPromise, res) {
  try { res.json(await controllerPromise) }
  catch (reason) { console.error(reason); res.status(500).send(reason) }
}

module.exports = router