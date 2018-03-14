const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  owner: String,
  coin: String,
  side: Boolean,
  amount: Number,
  price: Number
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction