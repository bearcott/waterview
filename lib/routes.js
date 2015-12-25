const _ = require('koa-route')

const router = require('koa-router')()
const c = require('../app/controllers')

c.applications.routes(router)

module.exports = router
