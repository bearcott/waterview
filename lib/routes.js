const router = require('koa-router')()
const c = require('../app/controllers')

c.applications.routes(router)
c.users.routes(router)

module.exports = app => {
  app.use(router.routes())
  app.use(router.allowedMethods())
}
