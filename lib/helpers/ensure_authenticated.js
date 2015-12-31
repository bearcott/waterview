const co = require('co')
const User = require('../../app/models/user')

module.exports = co.wrap(function *(ctx, next) {
  if (!ctx.state.user) {
    ctx.status = 401
    ctx.body = {
      error: 'Protected resource; use Authorization header to get access.'
    }
    return
  }

  const user = yield User.findById(ctx.state.user.id)
  if (!user) {
    ctx.status = 401
    ctx.body = {
      error: 'Invalid user specified in JWT'
    }
  }
  ctx.user = user

  yield next()
})
