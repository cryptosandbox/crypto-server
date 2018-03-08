
const zeroEx = require('0x.js')

module.exports = {
  getSalt: () => {
    let zx = new zeroEx.ZeroEx(provider, config)
    return zx.generatePseudoRandomSalt()
  },

  getBalance: (tokenAddress, ownerAddress) => {
    let zx = new zeroEx.ZeroEx()
    return zx.token.getBalanceAsync(tokenAddress, ownerAddress)
  }
}