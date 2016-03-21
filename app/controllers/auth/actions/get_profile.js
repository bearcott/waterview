const compose = require('koa-compose')
const jwt = require('koa-jwt')
const co = require('co')

const constants = require('../../../../lib/constants')
const User = require('../../../models/user')
const ensureAuthenticated = require('../../../../lib/helpers/ensure_authenticated')

const get_profile = co.wrap(function*(ctx) {
  const email = ctx.state.user.email;

  //maybe I need to handle this.. but state cant be invalid so...
  const user = yield User.findOne({
    where: { email: email }
  })

  ctx.body = {
    profile: user.profile
  }
});

module.exports = compose([ensureAuthenticated, get_profile])
