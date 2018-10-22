const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const Transaction = require('./transaction.model')
const userController = require('../user/user.controller.mongodb')
const _ = require('lodash')

mongoose.Promise = require('bluebird')

module.exports = {
  create: async (transaction) => {
    let user = await userController.read(transaction.userId)
    console.log(user)
    let holding = _.find(user.wallet, (h) => h.coin == transaction.coin)
    if (holding) {
      holding.balance += +(transaction.amount)
    } else {
      user.wallet.push({coin: transaction.coin, balance: transaction.amount })
    }
    await userController.update(user)
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
  },

  delete: () => {
    return Transaction.remove()
  }
}