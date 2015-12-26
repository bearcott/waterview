const co = require('co')
const expect = require('chai').expect
const errorHandler = require('../../../lib/middlewares/error_handler')

describe('error handler', () => {

  it('should handle non-validation errors', function *() {
    const e = { name: 'OtherError' }
    const next = co.wrap(function *() {
      throw e
    })
    const ctx = {}
    yield errorHandler(ctx, next)
    expect(ctx.status).to.equal(500)
    expect(ctx.body).to.eql({
      error: 'Internal server error'
    })
  })

  it('should handle validation errors', function *() {
    const e = { name: 'JoiValidationError' }
    const next = co.wrap(function *() {
      throw e
    })
    const ctx = {}
    yield errorHandler(ctx, next)
    expect(ctx.status).to.equal(400)
    expect(ctx.body).to.eql({
      error: 'Validation error',
      reason: e
    })
  })

})
