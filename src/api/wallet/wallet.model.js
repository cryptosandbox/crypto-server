const mongoose = require('mongoose')
const Schema = mongoose.Schema

let WalletSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  holdings: [{
    symbol: String,
    balance: Number
  }]
})

const Wallet = mongoose.model('Wallet', WalletSchema);
module.exports = Wallet;