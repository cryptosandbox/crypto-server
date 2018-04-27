const cryptoRouter = require('./crypto/crypto.router')
const transactionRouter = require('./transaction/transaction.router')
const userRouter = require('./user/user.router')
const walletRouter = require('./wallet/wallet.router')
const passport = require('passport')

module.exports.initialize = app => {
  app.use('/', cryptoRouter)
  app.use('/api/crypto', cryptoRouter)
  app.use('/api/transactions', transactionRouter)
  app.use('/api/users', userRouter)
  // app.use('/api/wallets', passport.authenticate('bearer', { session: false }), walletRouter)
  app.use('/api/wallets', walletRouter)
}