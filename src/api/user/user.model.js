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
  walletId: {
    type: Schema.Types.ObjectId,
    ref: 'Wallet'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;