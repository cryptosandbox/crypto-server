const express = require('express')
const router = express.Router()

const poloniexController = require('../../controllers/poloniex')

router.route('/')
  .get((req, res) => {
    poloniexController.getCurrencies()
      .then((value) => {
        res.json(value)
      })
      .catch((reason) => {
        res.status(500).send(reason)
      })
  })

module.exports = router