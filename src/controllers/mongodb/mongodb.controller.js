const mongoose = require('mongoose')

function connect(connection) {
  return new Promise((res, rej) => {
    if(connection == null) { connection = mongoose }
    connection.connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('mongoose connection successful')
        res()
      })
      .catch(reason => {
        console.error('mongoose not connected\n', reason)
        rej(reason)
      })
  })
}

module.exports = { connect };