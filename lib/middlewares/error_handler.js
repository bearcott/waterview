const co = require('co')
const compose = require('koa-compose')

const errorHandler = co.wrap(function *(ctx, next) {
  try {
    yield next()
  } catch(e) {
    console.error(e.stack)
    ctx.status = 500
    ctx.body = {
      error: 'Internal server error'
    }
  }
})

const validationErrorHandler = co.wrap(function *(ctx, next) {
  try {
    yield next()
  } catch(e) {
    if (!e.isJoi) throw e
    ctx.status = 400
    ctx.body = {
      error: 'Validation error',
      reason: e
    }
  }
})

module.exports = compose([errorHandler, validationErrorHandler])
