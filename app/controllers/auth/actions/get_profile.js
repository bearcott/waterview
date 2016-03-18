const compose = require('koa-compose')
const jwt = require('koa-jwt')

const constants = require('../../../../lib/constants')
const ensureAuthenticated = require('../../../../lib/helpers/ensure_authenticated')

const get_profile = ctx => {
  ctx.body = {
    profile: ctx.state.user.profile
  }
}

module.exports = compose([ensureAuthenticated, get_profile])
