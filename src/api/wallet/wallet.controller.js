const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const Wallet = require('./wallet.model')

mongoose.Promise = require('bluebird')

module.exports = {
  create: (wallet) => {
    delete wallet._id
    return new Wallet(wallet).save()
  },

  readAll: () => {
    return Wallet.find()
  },

  read: (id) => {
    return Wallet.findById(ObjectId(id))
  },
  
  update: (id, wallet) => {
    return Wallet.findByIdAndUpdate(id, wallet, { new: true }).exec()
  },

  delete: (id) => {
    return Wallet.findByIdAndRemove(id)
  }
}