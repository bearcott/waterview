const _ = require('koa-route')

const router = require('koa-router')()
const c = require('../app/controllers')

c.users.routes(router)

module.exports = router
