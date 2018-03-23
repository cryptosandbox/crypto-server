const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  owner: String,
  coin: String,
  amount: Number,
  price: Number
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction