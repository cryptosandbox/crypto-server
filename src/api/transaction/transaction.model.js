const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  walletId: {
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true
  },
  coin: String,
  amount: Number,
  price: Number
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction