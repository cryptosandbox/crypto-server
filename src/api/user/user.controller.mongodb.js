const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('./user.model')
const Promise = require('bluebird')
const bcrypt = require('bcrypt')
const _ = require('lodash')

mongoose.Promise = Promise

module.exports = {
  create: (user) => {
    return new Promise((res, rej) => {
      delete user._id
      new User(user).save()
        .then(userResult => {
          let userObj = userResult.toObject();
          delete userObj['password'];
          res(userObj)
        })
        .catch(err => {
          rej(err)
        })
    })
  },

  readAll: () => {
    return User.find({}, { password: 0 })
  },

  read: (id) => {
    return User.findById(ObjectId(id), { password: 0 })
  },

  findByLogin: (username, password) => {
    return new Promise((resolve, reject) => {
      User.findOne({ username: username })
        .then(user => {
          if (user) { 
            bcrypt.compare(password, user.password, (err, res) => {
              if(res) { resolve(user) } 
              else { console.error('error in bcrypt:', err); reject(new Error('Invalid password')) }
            })
          } else {
            reject(new Error('User not found'))
          }
        })
      })
  },
  
  update: (user) => {
    //hashPassword(user)
    return User.findByIdAndUpdate(user.id, user, { new: true }).exec()
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