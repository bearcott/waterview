const expect = require('chai').expect
const User = require('../../../app/models/user')

describe('user', () => {

  it('should allow setting passwords', function *() {
    const user = User.build({
      email: 'me@ian.pw'
    })

    // no password set
    expect(yield user.comparePassword('test')).to.be.false

    yield user.setPassword('test')
    expect(yield user.comparePassword('test')).to.be.true
    expect(yield user.comparePassword('testb')).to.be.false
  })

})
