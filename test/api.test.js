process.env.NODE_ENV = 'test'

const app = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('API', () => {
  describe('Get crypto', () => {
    it('returns an array of data from poloniex', done => {
      chai.request(app)
        .get('/api/crypto')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body[0].coin.should.equal('BTC')
          done()
        })
    })
  })
  describe('Get currencies', () => {
    it('returns currency data from poloniex', done => {
      chai.request(app)
        .get('/api/currencies')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
  })
})