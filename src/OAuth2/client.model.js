const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ClientSchema = new Schema({
  id: String,
  secret: String,
  grants: [String]
})

const Client = mongoose.model('Client', ClientSchema)
module.exports = Client;