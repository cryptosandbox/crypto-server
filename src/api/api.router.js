const cryptoRouter = require('./crypto/crypto.router')
const transactionRouter = require('./transaction/transaction.router')
const userRouter = require('./user/user.router')

function setRoutes(app) {
  app.use('/', cryptoRouter)
  app.use('/api/crypto', cryptoRouter)
  app.use('/api/transactions', transactionRouter)
  app.use('/api/users', userRouter)
}

module.exports = { setRoutes }