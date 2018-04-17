var mongoose = require('mongoose');
var userController = require('../api/user/user.controller')
const Token = require('./token.model')
const Client = require('./client.model')

module.exports = {
  getAccessToken: (accessToken, callback) => {
    console.log('getAccessToken')
    Token.findOne({accessToken: accessToken})
      .then(token => {
        console.log(token)
        callback(false, token)
      })
  },

  getClient: (clientId, clientSecret, callback) => {
    console.log('getClient')
    let client = {
      clientId,
      clientSecret,
      grants: null,
      redirectUris: null
    }
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
        console.log('User:', user)
        callback(false, user)
      })
      .catch(reason => {
        callback(true, reason)
      })
  },

  saveAccessToken: (token, client, expires, user, callback) => {
    console.log('saveAccessToken')
    console.log('token:', token)
    console.log('expires:', expires)
    console.log('client', client)
    let newToken = {
      accessToken: token,
      expires: expires,
      scope: token.scope,
      client: {
        id: client
      },
      user: {
        id: user.id
      }
    }

    new Token(newToken).save()
      .then(token => {
        console.log('created token: ', token)
        callback(false, token)
      })
  }
}