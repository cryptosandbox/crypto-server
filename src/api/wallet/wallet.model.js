const mongoose = require('mongoose')

let WalletSchema = new mongoose.Schema({
  holdings: [{
    coin: String,
    amount: Number
  }]
})

const Wallet = mongoose.model('Wallet', WalletSchema);
module.exports = Wallet;