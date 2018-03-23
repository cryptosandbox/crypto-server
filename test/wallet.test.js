process.env.NODE_ENV = 'test'

const app = require('../app')
const Promise = require('bluebird')
const walletController = require('../src/api/wallet/wallet.controller')
const Wallet = require('../src/api/wallet/wallet.model')
const walletMocks = require('./wallet.mocks')
const dbController = require('../src/controllers/db/db.controller')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

before(done => {
  dbController.connect('wallet').then(done)
})

describe('Wallets', () => {
  beforeEach(done => {
    Wallet.remove({}, err => { done() })
  })

  describe('/GET all wallets', () => {
    it('gets empty array by default', done => {
      chai.request(app)
        .get('/api/wallets')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.equal(0)
          done()
        })
    })

    it('gets all wallets', done => {
      let firstPromise = walletController.create(walletMocks[0])
      let secondPromise = walletController.create(walletMocks[1])

      Promise.all([firstPromise, secondPromise])
        .then((values) => {
          chai.request(app)
            .get('/api/wallets')
            .end((err, res) => {
              console.log(res.body)
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.should.have.length(2)
              done()
            })
        })
    })
  })

  describe('/GET wallet by user', () => {
    it('returns the correct wallet', done => {
      let firstPromise = walletController.create(walletMocks[0])
      let secondPromise = walletController.create(walletMocks[1])

      Promise.all([firstPromise, secondPromise])
        .then(values =>  {
          chai.request(app)
            .get(`/api/wallets?user=${walletMocks[0].user}`)
            .end((err, res) => {
              console.log(res.body)
              res.should.have.status(200)
              res.body[0].user.should.equal(walletMocks[0].user)
              res.body[0].holdings[0].balance.should.equal(64)
              done()
            })
        })
    })
  })

  describe('/POST a wallet', () => {
    it('adds a new wallet', done => {
      let wallet = walletMocks[0]

      chai.request(app)
        .post('/api/wallets')
        .send(wallet)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.user.should.equal(wallet.user)
          res.body.holdings[0].balance.should.equal(wallet.holdings[0].balance)
          done()
        })
    })

    it('ignores the _id field', done => {
      let wallet = {
        _id: '',
        user: 'Mark Smith',
        holdings: [{ coin: 'BTC', balance: 64}]
      }
      chai.request(app)
      .post('/api/wallets')
      .send(wallet)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('_id')
        res.body.user.should.equal(wallet.user)
        res.body.holdings[0].balance.should.equal(wallet.holdings[0].balance)
        done()
      })
    })
  })

  describe('/DELETE all wallets', () => {
    it('removes all wallets', done => {
      let firstPromise = walletController.create(walletMocks[0])
      let secondPromise = walletController.create(walletMocks[1])

      Promise.all([firstPromise, secondPromise])
        .then((values) => {
          chai.request(app)
            .delete('/api/wallets')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.ok.should.be.equal(1)
              chai.request(app)
                .get('/api/wallets')
                .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('array')
                  res.body.length.should.be.eql(0)
                  done()
                })
            })
        })
    })
  })

  describe('/GET one wallet', () => {
    it('returns one wallet by id', done => {
      let wallet = new Wallet()
      wallet.save((err, wallet) => {
        chai.request(app)
          .get('/api/wallets/' + wallet._id)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')            
            res.body.should.have.property('_id').equals(wallet._id.toString())
          done()
          })
      })
    })

    it('returns error on incorrect id', done => {
      chai.request(app)
        .get('/api/wallets/' + 'incorrectid')
        .end((err, res) => {
          res.should.have.status(500)
          done()
        })
    })
  })

  describe('/PUT an update', () => {
    it('modifies the selected wallet', done => {
      let oldWallet = new Wallet({
        holdings: [{ name: 'BTC', balance:0 }]
      })
      oldWallet.save((err, wallet) => {
        let updatedWallet = new Wallet({
          _id: wallet._id,
          holdings: [{ name: 'BTC', balance: 64}]
        })
        chai.request(app)
          .put('/api/wallets/' + updatedWallet._id)
          .send(updatedWallet)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')            
            res.body.should.have.property('_id').equals(wallet._id.toString())
            res.body.holdings[0].balance.should.equal(64)
            res.body.holdings[0].balance.should.not.equal(wallet.holdings[0].balance)
            done()
          })
      })
    })

    it('returns error on incorrect id', done => {
      chai.request(app)
        .put('/api/wallets/' + 'incorrectid')
        .end((err, res) => {
          res.should.have.status(500)
          done()
        })
    })
  })

  describe('/DELETE one wallet', () => {
    it('removes the item with the given id', done => {
      let wallet = new Wallet()
      wallet.save((err, wallet) => {
        chai.request(app)
          .delete('/api/wallets/' + wallet._id)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body._id.should.be.equal(wallet._id.toString())
            chai.request(app)
              .get('/api/wallets/' + wallet._id)
              .end((err, res) => {
                res.should.have.status(200)
                should.not.exist(res.body)
                done()
              })
          })
      })
    })

    it('returns error on incorrect id', done => {
      chai.request(app)
        .delete('/api/wallets/' + 'incorrectid')
        .end((err, res) => {
          res.should.have.status(500)
          done()
        })
    })
  })
})