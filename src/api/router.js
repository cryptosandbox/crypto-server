const express = require('express')
const router = express.Router()

const walletRouter = require('./wallet.router')
const poloniexController = require('../controllers/crypto/poloniex.controller')
const walletController = require('../controllers/wallet/wallet.controller')

function setRoutes(app) {
  app.use('/api/wallets', walletRouter)
  app.use('/api', router)
}

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

router.route('/transaction')
  .get((req, res) => {

  })

async function handleController(controllerPromise, res) {
  try { res.send(await controllerPromise) }
  catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}

module.exports = { setRoutes }