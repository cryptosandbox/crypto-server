const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('./user.model')

mongoose.Promise = require('bluebird')

module.exports = {
  create: (user) => {
    delete user._id
    let mongoUser = new User(user)
    console.log('mongoUser:', mongoUser)
    return mongoUser.save()
  },

  readAll: (owner) => {
    if (owner) {
      return user.findOne({owner: owner})
    }
    return User.find()
  },

  read: (id) => {
    return User.findById(ObjectId(id))
  },
  
  update: (id, user) => {
    return User.findByIdAndUpdate(id, user, { new: true }).exec()
  },

  deleteAll: () => {
    return User.deleteMany()
  },

  delete: (id) => {
    return User.findByIdAndRemove(id)
  }
}