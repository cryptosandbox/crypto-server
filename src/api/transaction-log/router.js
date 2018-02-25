const express = require('express')
const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.send('Transaction Log')
  })

module.exports = router