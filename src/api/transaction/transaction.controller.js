const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const Transaction = require('./transaction.model')
const walletController = require('../wallet/wallet.controller')
const _ = require('lodash')

mongoose.Promise = require('bluebird')

module.exports = {
  create: async (transaction) => {
    let wallet = await walletController.read(transaction.walletId)
    let holding = _.find(wallet.holdings, (holding) => holding.symbol == transaction.coin)
    if (holding) {
      holding.balance += +(transaction.amount)
    } else {
      wallet.holdings.push({symbol: transaction.coin, balance: transaction.amount })
    }
    await walletController.update(transaction.walletId, wallet)
    wallet = await walletController.read(transaction.walletId)
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