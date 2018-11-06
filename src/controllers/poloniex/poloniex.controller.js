const Poloniex = require('poloniex-api-node')
let poloniex = new Poloniex()
const _ = require('lodash')
const { DateTime } = require('luxon')

async function getCombined(baseCurrency) {
  let tickers = await getTickers(baseCurrency)
  let currencies = await getCurrencies()

  _.forEach(tickers, ticker => ticker.name = currencies[ticker.coin].name)

  return tickers
}

async function getTickers(baseCurrency) {
  return new Promise((resolve, reject) => {
    poloniex.returnTicker()
      .then(tickers => {
        let keys = Object.keys(tickers).filter(key => key.startsWith('USDT_'))
        let filteredTickers = []
        _.forEach(keys, key => {
          let coin = key.slice(baseCurrency.length + 1);
          filteredTickers.push({
            coin: coin,
            last: tickers[key].last,
            volume: tickers[key].baseVolume,
            change: tickers[key].percentChange
          })
        })
        resolve(filteredTickers)
      })
      .catch(reason => { console.error(reason) })
  })
}

async function getCurrencies() {
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
  let tickers = await getTickers(currencyPrefix)

  return tickers
}

async function getChart(symbol) {
  return new Promise((resolve, reject) => {
    poloniex.returnChartData(`USDT_${symbol}`, 900, DateTime.local().minus({ hours: 24 }).toMillis() / 1000, DateTime.local().toMillis() / 1000)
      .then(chartData => {
        resolve(chartData)
      })
      .catch(reason => {
        console.error(reason)
        reject('Could not get chart data')
      })
  })
}
module.exports = { getCombined, getCurrencies, getChart }