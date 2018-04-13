const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('./user.model')

mongoose.Promise = require('bluebird')

module.exports = {
  create: (user) => {
    delete user._id
    return new User(user).save()
  },

  readAll: () => {
    return User.find()
  },

  read: (id) => {
    return User.findById(ObjectId(id))
  },

  findByLogin: (username, password) => {
    return User.find({username: username, password: password})
  },
  
  update: (id, user) => {
    return User.findByIdAndUpdate(id, user, { new: true }).exec()
  },

  delete: (id) => {
    return User.findByIdAndRemove(id)
  },
  
  deleteAll: () => {
    return User.deleteMany()
  }
}