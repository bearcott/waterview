const co = require('co')
const User = require('../../../models/user')

module.exports = co.wrap(function *(ctx, next) {
  const id = ctx.params.id
  const user = yield User.findById(id)
  if (!user) {
    ctx.body = 'User could not be found.'
    return
  }
  ctx.user = user
  yield next()
})
