const express = require('express')
const router = express.Router()

const walletRouter = require('./wallet.router')
const poloniexController = require('../controllers/crypto/poloniex.controller')
const walletController = require('../controllers/wallet/wallet.controller')
const zeroExController = require('../controllers/0x/0x.controller')

router.route('/transaction-log')
  .get((req, res) => {
    res.send('Transaction Log')
  })

router.route('/currencies')
  .get((req, res) => {
    handleController(poloniexController.getCurrencies(), res)
  })

router.route('/crypto')
  .get((req, res) => {
    handleController(poloniexController.getCombined('USDT'), res)
  })

router.route('/0x')
  .get((req, res) => {
    handleController(zeroExController.getBalance('',''))
  })

router.route('/0x/salt')
  .get((req, res) => {
    handleController(zeroExController.getSalt())
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