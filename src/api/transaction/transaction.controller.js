const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const Transaction = require('./transaction.model')
const userController = require('../user/user.controller')
const _ = require('lodash')

mongoose.Promise = require('bluebird')

module.exports = {
  create: async (transaction) => {
    let wallet = await userController.read(transaction.userId)
    let holding = _.find(wallet, (h) => h.symbol == transaction.coin)
    if (holding) {
      holding.balance += +(transaction.amount)
    } else {
      wallet.push({symbol: transaction.coin, balance: transaction.amount })
    }
    await userController.update(transaction.userId, wallet)
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