process.env.NODE_ENV = 'test'

const app = require('../app')
const Promise = require('bluebird');
const walletController = require('../src/api/wallet/wallet.controller')
const Wallet = require('../src/api/wallet/wallet.model')
const mockwallet = require('../src/api/wallet/wallet.mock')
const dbController = require('../src/controllers/db/db.controller')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

before(done => {
  dbController.connect('wallet').then(done)
})

describe('wallets', () => {
  beforeEach( done => {
    Wallet.remove({}, err => { done() })
  })

  describe('/GET wallet by name', () => {
    it('returns the correct wallet', async () => {
      let wallet = mockwallet[0];
      let wallet2 = mockwallet[1];

      await walletController.create(wallet)
      await walletController.create(wallet2)

      let c = chai.request(app)
        .get(`/api/wallets?walletname=${wallet.walletname}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.walletname.should.equal(wallet.walletname)
          res.body.email.should.equal(wallet.email)
        })
    })
  })

  describe('/POST a wallet', () => {
    it('adds a new wallet', done => {
      let wallet = mockwallet[0];
      chai.request(app)
        .post('/api/wallets')
        .send(wallet)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.holdings[0].amount.should.equal(wallet.holdings[0].amount)
          done()
        })
    })

    it('ignores the _id field', done => {
      let wallet = mockwallet[0]
      chai.request(app)
      .post('/api/wallets')
      .send(wallet)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('_id')
        res.body.holdings.should.be.a('array')
        done()
      })
    })
  })

  describe('/GET one wallet', () => {
    it('returns one wallet by id', done => {
      let wallet = new Wallet(mockwallet[0])
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

    it('returns error on incorrect id', () => {
      chai.request(app)
        .get('/api/wallets/' + 'incorrectid')
        .end((err, res) => {
          res.should.have.status(500)
        })
    })
  })

  describe('/PUT an update', () => {
    it('modifies the selected wallet', done => {
      let wallet = new Wallet(mockwallet[0])
      wallet.save((err, wallet) => {
        wallet.email = 'updatedEmail'
        chai.request(app)
          .put('/api/wallets/' + wallet._id)
          .send(wallet)
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
        .put('/api/wallets/' + 'incorrectid')
        .end((err, res) => {
          res.should.have.status(500)
          done();
        })
    })
  })

  describe('/DELETE one wallet', () => {
    it('removes the item with the given id', done => {
      let wallet = new Wallet(mockwallet[0])
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