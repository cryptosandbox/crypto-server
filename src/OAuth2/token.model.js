const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TokenSchema = new Schema({
  accessToken: String,
  accessTokenExpiresAt: Date,
  scope: String,
  client: {
    id: String
  },
  user: {
    id: String
  }
})

const Token = mongoose.model('Token', TokenSchema)
module.exports = Token;