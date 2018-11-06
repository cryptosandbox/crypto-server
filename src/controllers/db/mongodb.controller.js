const mongoose = require('mongoose')
const app = require('../../../app')

function connect(dbName) {
  return new Promise((res, rej) => {
    let connectionString = ""

    if(process.env.NODE_ENV === 'test'){
      connectionString = `${process.env.MONGODB_URI}/${dbName}-test`
    } else {
      connectionString = `${process.env.MONGODB_URI}`
    }

    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    mongoose.connect(connectionString, { useNewUrlParser: true })
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