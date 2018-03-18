const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const cors = require('cors')

dotEnv.config()

const dbController = require('./src/controllers/db/db.controller')
const apiRouter = require('./src/api/api.router')

const app = express()

app.use(cors())
app.use(bodyParser.json())

apiRouter.setRoutes(app)

if(process.env.NODE_ENV != 'test') {
  initializeDb()
}

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on ${process.env.HOST}:${process.env.PORT}`)
  console.log(`running in ${process.env.NODE_ENV} mode`)
})

async function initializeDb() {
  try {
    await dbController.connect()
  } catch (error) {
    console.error('Error on db initialization:', error)
  }
}

module.exports = app