const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coin: String,
  amount: Number,
  price: Number
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction