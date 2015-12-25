const _ = require('koa-route')

const c = require('../app/controllers')

module.exports = function(app) {
  app.use(_.post('/applications', c.applications.create))
}
