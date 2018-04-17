const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('./user.model')
const Promise = require('bluebird')
const bcrypt = require('bcrypt')

mongoose.Promise = Promise

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
    return new Promise((resolve, reject) => {
      User.findOne({ username: username })
        .then(user => {
          console.log('found user:', user)
          console.log('password:', password)
          console.log('user.password:', user.password)
          bcrypt.compare(password, user.password, (err, res) => {
            if(res) { console.log('res:', res); resolve(user) } 
            else { console.log('err:', err); reject(err) }
          })
        })
      })
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