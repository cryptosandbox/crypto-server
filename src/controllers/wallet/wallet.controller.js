const mongoose = require('mongoose')
const Wallet = require('./wallet.model')
const ObjectId = require('mongoose').Types.ObjectId

mongoose.Promise = require('bluebird')

module.exports = {
  connect: (connection) => {
    if(connection == null) { connection = mongoose }
    console.log('connecting to', process.env.MONGODB_URI)
    connection.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('mongoose connection successful')
    })
    .catch(reason => {
      console.log('mongoose not connected\n', reason)
    })
  },

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

  findByTitle: (title) => {
    return Wallet.findOne({title: title})
  },

  update: (id, wallet) => {
    return Wallet.findByIdAndUpdate(id, wallet, { new: true }).exec()
  },

  deleteAll: () => {
    return Wallet.deleteMany()
  },

  delete: (id) => {
    return Wallet.findByIdAndRemove(id)
  }
}