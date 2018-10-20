const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  wallet: [{
    symbol: String,
    balance: Number
  }]
});

UserSchema.pre('save', function (next) {
  var user = this
  console.log("Saving")
  bcrypt.hash(user.password, 10, (err, hash) => {
    console.log("something got hashed")
    if (err) return next(err)
    user.password = hash
    next()
  })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;