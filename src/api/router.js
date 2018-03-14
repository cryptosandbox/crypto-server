const cryptoRouter = require('./crypto/crypto.router')
const walletRouter = require('./wallet/wallet.router')
const transactionRouter = require('./transaction/transaction.router')

function setRoutes(app) {
  app.use('/api/crypto', cryptoRouter)
  app.use('/api/wallets', walletRouter)
  app.use('/api/transactions', transactionRouter)
}

module.exports = { setRoutes }