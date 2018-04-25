const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('./user.model')
const Promise = require('bluebird')
const bcrypt = require('bcrypt')

mongoose.Promise = Promise

module.exports = {
  create: (user) => {
    delete user._id
    hashPassword(user)
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
          if (user) { 
            bcrypt.compare(password, user.password, (err, res) => {
              if(res) { resolve(user) } 
              else { reject(err) }
            })
          } else {
            reject(new Error('user not found'))
          }
        })
      })
  },
  
  update: (id, user) => {
    hashPassword(user)
    return User.findByIdAndUpdate(id, user, { new: true }).exec()
  },

  delete: (id) => {
    return User.findByIdAndRemove(id)
  },
  
  deleteAll: () => {
    return User.deleteMany()
  }
}

function hashPassword(user) {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    console.log(hash)
    user.password = hash
  })
}