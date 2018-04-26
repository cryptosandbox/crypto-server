const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('./user.model')
const Promise = require('bluebird')
const bcrypt = require('bcrypt')
const walletController = require('../wallet/wallet.controller')

mongoose.Promise = Promise

module.exports = {
  create: (user) => {
    return new Promise((res, rej) => {
      delete user._id
      hashPassword(user)
      new User(user).save()
        .then(newUser => {
          let wallet = { userId: newUser._id }
          walletController.create(wallet)
            .then(wallet => {
              res(newUser)
            })
        })
        .catch(err => {
          rej(err)
        })
    })
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
    user.password = hash
  })
}