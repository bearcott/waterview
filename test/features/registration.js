const expect = require('chai').expect
const app = require('../../lib/app')
const request = require('supertest-as-promised').agent(app.listen())
const User = require('../../app/models/user')

describe('registration', () => {

  it('should create a user', function *() {

    const profile = {
      registration: {
        q1: true,
        q2: [1, 2, 3]
      }
    }

    // Create user
    const res = yield request.post('/users')
      .send({
        email: 'me@ian.pw',
        profile: profile
      }).expect(200)

    const body = res.body
    expect(body.data.email).to.equal('me@ian.pw')
    expect(body.data.profile).to.eql(profile)

    // Find created user
    const user = yield User.findById(body.data.id)
    const token = user.confirmationToken

    // Confirm user
    const confirm = yield request.get('/users/confirm')
      .query({
        email: 'me@ian.pw',
        confirmationToken: token
      }).expect(200)
    expect(confirm.body.valid).to.be.true

    // Register user
    const register = yield request.post('/users/register')
      .send({
        email: 'me@ian.pw',
        confirmationToken: token,
        password: 'password'
      }).expect(200)
    expect(register.body.success).to.be.true

    yield user.reload()
    expect(yield user.comparePassword('password')).to.be.true

  })

  it('should not allow duplicates', function *() {
    const payload = {
      email: 'bear@stearns.com',
      profile: {
        registration: {}
      }
    }
    yield request.post('/users')
      .send(payload).expect(200)
    const err = yield request.post('/users')
      .send(payload).expect(400)
    expect(err.body.message).to.equal('Email already registered.')
  })

})
