const co = require('co')
const compose = require('koa-compose')

const User = require('../../../models/user')
const find = require('../middlewares/find')

const update = co.wrap(function *(ctx) {
  ctx.body = ctx.user
})

module.exports = compose([find, update])
