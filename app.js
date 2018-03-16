const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const cors = require('cors')

dotEnv.config()

const mongoController = require('./src/controllers/mongodb/mongodb.controller')
const apiRouter = require('./src/api/api.router')

const app = express()

app.use(cors())
app.use(bodyParser.json())

apiRouter.setRoutes(app)

mongoController.connect()

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on ${process.env.HOST}:${process.env.PORT}`)
  console.log(`running in ${process.env.NODE_ENV} mode`)
})

module.exports = app