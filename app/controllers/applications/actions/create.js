const co = require('co')

const User = require('../../../models/user')

module.exports = co.wrap(function *(ctx) {
  const user = yield User.create(ctx.req.body)
  ctx.body = user
})
