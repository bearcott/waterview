const co = require('co')
const jwt = require('koa-jwt')
const constants = require('../../../../lib/constants')
const User = require('../../../models/user')

module.exports = co.wrap(function *(ctx) {
  const email = ctx.request.body.email
  const password = ctx.request.body.password

  const user = yield User.findOne({
    where: { email: email }
  })
  const isCorrect = !!user && (yield user.comparePassword(password))
  if (!isCorrect) {
    ctx.status = 401
    ctx.body = {
      error: 'Invalid username or password.'
    }
    return
  }

  const token = jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role
  }, constants.SESSION_SECRET, {
    expiresInMinutes: constants.SESSION_EXPIRY
  })
  ctx.body = {
    token: token
  }
})
