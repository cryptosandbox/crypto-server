const cryptoRouter = require('./crypto/crypto.router')
const transactionRouter = require('./transaction/transaction.router')
const userRouter = require('./user/user.router')
const walletRouter = require('./wallet/wallet.router')

module.exports.initialize = app => {
  app.use('/', cryptoRouter)
  app.use('/api/crypto', cryptoRouter)
  app.use('/api/transactions', transactionRouter)
  app.use('/api/users', userRouter)
  app.use('/api/wallets', walletRouter)
}