const express = require('express')
const router = express.Router()

const poloniexController = require('../../controllers/poloniex')

router.route('/')
  .get((req, res) => {
    poloniexController.getCryptoData('USDT')
      .then((tickers) => {
        res.json(tickers)
      })
      .catch((reason) => {
        console.error(reason)
        res.status(500).send(reason)
      })
  })

module.exports = router