var mongoose = require('mongoose');
var userController = require('../api/user/user.controller')
const Token = require('./token.model')
const Client = require('./client.model')

module.exports = {
  getAccessToken: (accessToken) => {
    console.log('getAccessToken')
    return Token.findOne({ accessToken: accessToken })
  },

  getClient: (clientId, clientSecret, callback) => {
    console.log('getClient')
    let client = {
      clientId,
      clientSecret,
      grants: null,
      redirectUris: null
    }
    // return Client.findOne({ id: clientId, secret: clientSecret })
    // return new Promise((res, rej) => { res(client) })
    callback(false, client)
  },

  grantTypeAllowed: (clientId, grantType, callback) => {
    console.log('grantTypeAllowed')
    callback(false, true)
  },

  getUser: (username, password, callback) => {
    console.log('getUser')
    userController.findByLogin(username, password)
      .then((user) => {
        console.log('User:', user[0])
        callback(false, user[0])
      })
      .catch(reason => {
        callback(true, reason)
      })
  },

  saveAccessToken: (token, client, expires, user, callback) => {
    console.log('saveToken')
    let newToken = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      scope: token.scope,
      client: {
        id: client.id
      },
      user: {
        id: user.id
      }
    }

    new Token(newToken).save()
      .then(token => {
        callback(false, token)
      })
  }
}