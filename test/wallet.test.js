process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Mockgoose = require('mockgoose').Mockgoose
let mockgoose = new Mockgoose(mongoose)

let app = require('../app')
let Promise = require('bluebird');
let walletController = require('../src/controllers/wallet/wallet.controller')
let Wallet = require('../src/controllers/wallet/wallet.model')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

chai.use(chaiHttp)

before( done => {
  walletController.connect()
  done()
})

describe('Wallets', () => {
  beforeEach( done => {
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
      let wallet1 = new Wallet()
      let wallet1promise = wallet1.save()
      let wallet2 = new Wallet()
      let wallet2promise = wallet2.save()

      Promise.all([wallet1promise, wallet2promise])
        .then((values) => {
          chai.request(app)
            .get('/api/wallets')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.should.have.length(2)
              res.body[0]._id.should.equal(wallet1._id.toString())
              res.body[1]._id.should.equal(wallet2._id.toString())
              done()
            })
        })
    })
  })

  describe('/GET wallet by name', () => {
    it('returns the correct wallet', async (done) => {
      let wallet = {
        owner: 'mduguay',
        balance: 0
      }

      let wallet2 = {
        owner: 'tnorling',
        balance: 5
      }

      await walletController.create(wallet)
      await walletController.create(wallet2)

      chai.request(app)
        .get('/api/wallets?owner=mduguay')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.owner.should.equal('mduguay')
          res.body.balance.should.equal(0)
          done();
        })
    })
  })

  describe('/POST a wallet', () => {
    it('adds a new wallet', done => {
      let wallet = {
        owner: 'John Doe',
        balance: 'Balance'
      }
      chai.request(app)
        .post('/api/wallets')
        .send(wallet)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.owner.should.equal(wallet.owner)
          res.body.balance.should.equal(wallet.balance)
          done()
        })
    })

    it('ignores the _id field', done => {
      let wallet = {
        _id: '',
        owner: 'Mark Smith',
        balance: 'Balance'
      }
      chai.request(app)
      .post('/api/wallets')
      .send(wallet)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('_id')
        res.body.owner.should.equal(wallet.owner)
        res.body.balance.should.equal(wallet.balance)
        done()
      })
    })
  })

  describe('/DELETE all wallets', () => {
    it('removes all wallets', done => {
      let wallet1 = new Wallet()
      let wallet1promise = wallet1.save()
      let wallet2 = new Wallet()
      let wallet2promise = wallet2.save()

      Promise.all([wallet1promise, wallet2promise])
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
      let oldWallet = new Wallet({
        balance: 'OldBalance'
      })
      oldWallet.save((err, wallet) => {
        let updatedWallet = new Wallet({
          _id: wallet._id,
          balance: 'NewBalance'
        })
        chai.request(app)
          .put('/api/wallets/' + updatedWallet._id)
          .send(updatedWallet)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')            
            res.body.should.have.property('_id').equals(wallet._id.toString())
            res.body.balance.should.equal('NewBalance')
            res.body.balance.should.not.equal(wallet.balance)
            done()
          })
      })
    })

    it('returns error on incorrect id', () => {
      chai.request(app)
        .put('/api/wallets/' + 'incorrectid')
        .end((err, res) => {
          res.should.have.status(500)
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

    it('returns error on incorrect id', () => {
      chai.request(app)
        .delete('/api/wallets/' + 'incorrectid')
        .end((err, res) => {
          res.should.have.status(500)
        })
    })
  })
})