const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const Transaction = require('./transaction.model')
const walletController = require('../wallet/wallet.controller')
const _ = require('lodash')

mongoose.Promise = require('bluebird')

module.exports = {
  create: (transaction) => {
    let wallet = await walletController.readByUser(transaction.owner)
    let holding = _.find(wallet.holdings, { 'coin': transaciton.coin })
    holding.amount += transaction.amount
    console.log(wallet)
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