const mongoController = require('./mongodb.controller')

function connect(dbName) {
  return mongoController.connect(dbName)
}

module.exports = { connect }