const compose = require('koa-compose')
const jwt = require('koa-jwt')

const constants = require('../../../../lib/constants')
const ensureAuthenticated = require('../../../../lib/helpers/ensure_authenticated')

const refresh = ctx => {
  const token = jwt.sign(ctx.state.user, constants.SESSION_SECRET, {
    expiresInMinutes: constants.SESSION_EXPIRY
  })
  ctx.body = {
    token: token
  }
}

module.exports = compose([ensureAuthenticated, refresh])
