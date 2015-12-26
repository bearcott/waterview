const compose = require('koa-compose')

const find = require('../middlewares/find')

const show = (ctx) => {
  ctx.body = ctx.user
}

module.exports = compose([find, show])
