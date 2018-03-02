const express = require('express')
const router = express.Router()

const poloniexController = require('../controllers/poloniex')

router.route('/wallet')
  .get((req, res) => {
    res.send('Wallet')
  })

router.route('/transaction-log')
  .get((req, res) => {
    res.send('Transaction Log')
  })

router.route('/currencies')
  .get((req, res) => {
    handleController(poloniexController.getCurrencies(), res)
  })

router.route('/crypto-data')
  .get((req, res) => {
    handleController(poloniexController.getCombined('USDT'))
  })


function handleController(controllerPromise, res) {
  controllerPromise
    .then(data => {
      res.send(data)
    })
    .catch(reason => {
      console.error(reason)
      res.status(500).send(reason)
    })
}

module.exports = router