const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const cors = require('cors')

dotEnv.config()

const dbController = require('./src/controllers/db/db.controller')
const apiRouter = require('./src/api/api.router')
const authRouter = require('./src/OAuth2/auth.router')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

apiRouter.initialize(app)
authRouter.initialize(app)

if(process.env.NODE_ENV != 'test') {
  dbController.connect()
}

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on ${process.env.HOST}:${process.env.PORT}`)
  console.log(`running in ${process.env.NODE_ENV} mode`)
})

module.exports = app