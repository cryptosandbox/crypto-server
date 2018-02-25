const Poloniex = require('poloniex-api-node')
let poloniex = new Poloniex()
const _ = require('lodash')

function getTickers(baseCurrency) {
  return new Promise((resolve, reject) => {
    poloniex.returnTicker()
      .then((tickers) => {
        let keys = Object.keys(tickers).filter(key => key.startsWith('USDT_'))
        getCurrencies()
          .then(currencies => {
            let filteredTickers = []
            _.forEach(keys, key => {
              let coin = key.slice(baseCurrency.length + 1);
              filteredTickers.push({
                coin: coin,
                name: currencies[coin].name,
                last: tickers[key].last
              })
            })
            resolve(filteredTickers)
          })
          .catch((reason) => {
            console.error(reason)
            reject(reason)
          })
      })
      .catch((reason) => {
        console.error(reason)
        reject(reason)
      })
  })
}

function getCurrencies() {
  return new Promise((resolve, reject) => {
    poloniex.returnCurrencies()
      .then(currencies => {
        resolve(currencies)
      })
      .catch(reason => {
        reject(reason)
      })
  })
}

async function getCryptoData(currencyPrefix) {
  let currencies = await getCurrencies()
  let tickers = await getTickers(currencyPrefix)

  // join currencies and tickers

  return tickers
}

module.exports = { getCryptoData }