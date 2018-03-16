const mongoose = require('mongoose')
let Mockgoose = require('mockgoose').Mockgoose
const app = require('../../../app')

function connect() {
  return new Promise((res, rej) => {
    let connectionString = process.env.MONGODB_URI + process.env.APP_DB;
    
    if(process.env.NODE_ENV === 'test') {
      connectionString = process.env.MONGODB_URI + process.env.TEST_DB;
    }    

    mongoose.connect(connectionString)
      .then(() => {
        console.log(`mongoose successfully connected to ${connectionString}`)
        res()
      })
      .catch(reason => {
        console.error(`mongoose failed to connect to ${connectionString}\nReason:`, reason)
        rej(reason)
      })
  })
}

module.exports = { connect };