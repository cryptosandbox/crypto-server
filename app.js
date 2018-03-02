const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const cors = require('cors')

const apiRouter = require('./src/api/router')
const cryptoRouter = require('./src/api/crypto-data/router')

dotEnv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/crypto-data', cryptoRouter)
app.use('/api', apiRouter)

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on ${process.env.HOST}:${process.env.PORT}`)
  console.log(`running in ${process.env.NODE_ENV} mode`)
})

module.exports = app