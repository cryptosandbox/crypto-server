process.env.NODE_ENV = 'test'

const app = require('../app')
const dbController = require('../src/controllers/db/db.controller')

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

before(async () => {
  await dbController.connect('test')

  res = await chai.request(app)
    .del('/api/admin/users')
  res.should.have.status(200)
})

describe('Authentication', () => {
  afterEach(async () => {
    res = await signin()
    res = await chai.request(app)
      .del('/api/users')
      .set('Authorization', `bearer ${res.body.access_token}`)
    res.should.have.status(200)
  })

  it('Signup', async () => {
    res = await signup()
    res.should.have.status(200)
  })

  it('Signin', async () => {
    res = await signup()
    res.should.have.status(200)

    res = await signin()
    res.should.have.status(200)
  })
})

describe('App', () => {
  var authtoken
  var uid

  before(async () => {
    res = await signup()
    uid = res.body._id

    res = await signin()
    authtoken = res.body.access_token
  })

  after(async () => {
    res = await chai.request(app)
      .del('/api/users')
      .set('Authorization', `bearer ${authtoken}`)
    res.should.have.status(200)
  })

  it('Gets a user', async () => {
    res = await chai.request(app)
      .get('/api/users')
      .set('Authorization', `bearer ${authtoken}`)
    res.should.have.status(200)
    res.body._id.should.equal(uid)
  })

  it('Posts a transaction', async () => {
    res = await chai.request(app)
      .post('/api/transactions')
      .set('Authorization', `bearer ${authtoken}`)
      .send({
        coin: 'XRP',
        amount: 25
      })
    res.should.have.status(200)

    res = await chai.request(app)
      .get('/api/users')
      .set('Authorization', `bearer ${authtoken}`)
    res.should.have.status(200)
    res.body.wallet.should.be.a('array')
    res.body.wallet.length.should.equal(1)
    res.body.wallet[0].coin.should.equal('XRP')
    res.body.wallet[0].balance.should.equal(25)
  })
})

async function signup() {
  res = await chai.request(app)
    .post('/auth/signup')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      username: 'mock',
      password: '123abc',
      grant_type: 'password',
      email: 'mock@crypto.com'
    })
  res.should.have.status(200)
  return res
}

async function signin() {
  res = await chai.request(app)
    .post('/auth/signin')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      username: 'mock',
      password: '123abc',
      grant_type: 'password',
      client_id: 'crypto-playground',
      client_secret: 'null'
    })

  res.should.have.status(200)
  res.body.should.have.property('access_token')

  return res
}