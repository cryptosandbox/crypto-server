const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const Transaction = require('./transaction.model')

mongoose.Promise = require('bluebird')

module.exports = {
  create: (transaction) => {
    return new Transaction(transaction).save()
  },

  readAll: (owner) => {
    if (owner) {
      return Transaction.findOne({owner: owner})
    }
    return Transaction.find()
  },

  read: (id) => {
    return Transaction.findById(ObjectId(id))
  }
}