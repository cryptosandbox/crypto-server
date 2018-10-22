process.env.NODE_ENV = 'test'

const app = require('../app')
const Promise = require('bluebird');
const usermock = require('./user.mock')
const dbController = require('../src/controllers/db/db.controller')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

before(done => {
  dbController.connect('test').then(done)
})

describe('Users', () => {
  it('Greenlight', async () => {
    chaiapp = chai.request(app)
    res = await chaiapp.get('/api/users/all')

    res.should.have.status(200)
    res.body.should.be.a('array')
    res.body.length.should.equal(0)

    res = await chai.request(app).post('/api/users').send(usermock)
    console.log(res.message)
    res.should.have.status(200)
    res.body.should.be.a('object')
    res.body.should.have.property('_id')
    res.body.name.should.equal(usermock.name)
    res.body.email.should.equal(usermock.email)

    // chai.request(app)
    //   .get('/api/users')
    //   .end((err, res) => {
    //     res.should.have.status(200)
    //     res.body.should.be.a('array')
    //     res.body.length.should.equal(1)
    //     done()
    //   })

    // user.email = 'updatedEmail'
    // chai.request(app)
    //   .put('/api/users/' + user._id)
    //   .send(user)
    //   .end((err, res) => {
    //     res.should.have.status(200)
    //     res.body.should.be.a('object')
    //     res.body.should.have.property('_id').equals(user._id.toString())
    //     res.body.name.should.equal(user.name)
    //     res.body.email.should.equal(user.email)
    //     done()
    //   })

    // chai.request(app)
    //   .get('/api/users/' + user._id)
    //   .end((err, res) => {
    //     res.should.have.status(200)
    //     res.body.should.be.a('object')
    //     res.body.should.have.property('_id').equals(user._id.toString())
    //     res.body.email.should.equal(user.email)
    //     done()
    //   })

    // chai.request(app)
    //   .delete('/api/users/' + user._id)
    //   .end((err, res) => {
    //     res.should.have.status(200)
    //     res.body.should.be.a('object')
    //     res.body._id.should.be.equal(user._id.toString())
    //     chai.request(app)
    //       .get('/api/users/' + user._id)
    //       .end((err, res) => {
    //         res.should.have.status(200)
    //         should.not.exist(res.body)
    //         done()
    //       })
    //   })
  })
})