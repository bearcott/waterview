const expect = require('chai').expect
const app = require('../../lib/app')
const request = require('supertest-as-promised').agent(app.listen())
const User = require('../../app/models/user')

describe('registration', () => {

  it('should create a user', function *() {

    const profile = {
      answers: {
        q1: true,
        q2: [1, 2, 3]
      }
    }

    const res = yield request.post('/users')
      .send({
        email: 'me@ian.pw',
        profile: profile
      }).expect(200)

    const body = res.body
    expect(body.data.email).to.equal('me@ian.pw')
    expect(body.data.profile).to.eql(profile)

  })

})
