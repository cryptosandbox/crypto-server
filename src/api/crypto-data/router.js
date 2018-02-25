const express = require('express')
const router = express.Router()

const poloniexController = require('../../controllers/poloniex')

router.route('/')
  .get((req, res) => {
    poloniexController.getTickers('USDT')
      .then((tickers) => {
        res.json(tickers)
      })
      .catch((reason) => {
        res.status(500).send(reason)
      })
  })

module.exports = router