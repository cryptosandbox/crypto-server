const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const cors = require('cors')

dotEnv.config()

const apiRouter = require('./src/api/router')
const walletRouter = require('./src/api/wallet.router')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', apiRouter)
app.use('/api/wallets', walletRouter)

started = false;

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on ${process.env.HOST}:${process.env.PORT}`)
  console.log(`running in ${process.env.NODE_ENV} mode`)
  app.emit('appStarted')
  this.started = true;
})

module.exports = app