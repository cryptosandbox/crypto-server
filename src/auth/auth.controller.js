const User = require('./user.model')

module.exports = {
  signup: (user) => {
    return new User(user).save()
  }
}