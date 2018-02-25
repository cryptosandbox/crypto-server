const Poloniex = require('poloniex-api-node')
let poloniex = new Poloniex()

module.exports = {
  getTickers: (baseCurrency) => {
    return new Promise((resolve, reject) => {
      poloniex.returnTicker()
      .then((ticker) => {
        let keys = Object.keys(ticker).filter(key => key.startsWith('USDT_'))
        let filteredTickers = []
        keys.forEach(key => filteredTickers.push({
          coin: key.slice(baseCurrency.length+1),
          last: ticker[key].last}))
        resolve(filteredTickers)        
      })
      .catch((reason) => {
        reject(reason)
      })
    })
  }
}