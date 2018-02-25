const Poloniex = require('poloniex-api-node')
let poloniex = new Poloniex()
const _ = require('lodash')

module.exports = {
  getTickers: (baseCurrency) => {
    return new Promise((resolve, reject) => {
      poloniex.returnTicker()
      .then((tickers) => {        
        let keys = Object.keys(tickers).filter(key => key.startsWith('USDT_'))
        let filteredTickers = []
        _.forEach(keys, key => filteredTickers.push({
          coin: key.slice(baseCurrency.length+1),
          last: tickers[key].last
          }))
          
        resolve(filteredTickers)        
      })
      .catch((reason) => {
        reject(reason)
      })
    })
  },

  getCurrencies: () => {
    return new Promise((resolve, reject) => {
      poloniex.returnCurrencies()
        .then(currencies => {
          let keys = Object.keys(currencies)
          _.forEach(keys, key => currencies[key].coin = key)
          let filteredCurrencies = _.filter(currencies, { 'delisted': 0, 'disabled': 0, 'frozen': 0})
          resolve(filteredCurrencies) 
        })        
        .catch(reason => {
          reject(reason)
        })
    })
  }
}