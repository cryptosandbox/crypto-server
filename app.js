const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')

const cryptoDataRouter = require('./src/api/crypto-data/router')
const transactionLogRouter = require('./src/api/transaction-log/router')
const walletRouter = require('./src/api/wallet/router')

dotEnv.config()

const app = express()

app.use(bodyParser.json())

app.use('/api/crypto-data', cryptoDataRouter)
app.use('/api/transaction-log', transactionLogRouter)
app.use('/api/wallet', walletRouter)

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on ${process.env.HOST}:${process.env.PORT}`)
  console.log(`running in ${process.env.NODE_ENV} mode`)
})