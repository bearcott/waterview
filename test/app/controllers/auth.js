const expect = require('chai').expect
const app = require('../../../lib/app')
const request = require('supertest-as-promised').agent(app.listen())
const jwt = require('koa-jwt')
const User = require('../../../app/models/user')

describe('auth', () => {

  it('should allow login with a valid token', function *() {

    const email = 'ian@awesome.com'
    const password = 'testa'

    const user = User.build({
      email: email
    })
    yield user.setPassword(password)
    yield user.save()

    const result = yield request.post('/auth/login')
      .send({
        email: email,
        password: password
      }).expect(200)

    const token = result.body.token
    const decoded = jwt.decode(token)

    yield user.reload()

    expect(decoded.email).to.equal(email)
    expect(decoded.id).to.equal(user.id)

  })

  it('should support refresh', function *() {

    const email = 'ian2@awesome.com'
    const password = 'testa'

    const user = User.build({
      email: email
    })
    yield user.setPassword(password)
    yield user.save()

    const result = yield request.post('/auth/login')
      .send({
        email: email,
        password: password
      }).expect(200)
    const decoded = jwt.decode(result.body.token)

    yield user.reload()

    const refresh = yield request.post('/auth/refresh')
      .set({ 'Authorization': `Bearer ${result.body.token}` })
      .expect(200)
    const refreshed = jwt.decode(refresh.body.token)

    expect(decoded.email).to.equal(email)
    expect(decoded.id).to.equal(user.id)
    expect(decoded.email).to.equal(refreshed.email)
    expect(decoded.id).to.equal(refreshed.id)
    expect(decoded).to.not.equal(refreshed)

  })

})
