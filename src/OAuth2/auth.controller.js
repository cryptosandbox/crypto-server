const User = require('../api/user/user.model')

module.exports = {
  signup: (user) => {
    return new User(user).save()
  }
}