process.env.NODE_ENV = 'test'

const app = require('../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('API', () => {
  describe('Get crypto data', () => {
    it('returns an array of data from poloniex', () => {
      chai.request(app)
        .get('/api/crypto-data')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
        })
    })
  })
})