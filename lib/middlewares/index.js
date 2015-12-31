const convert = require('koa-convert')

module.exports = app => {
  app.use(require('./cors'))
  app.use(require('./error_handler'))
  app.use(require('./auth'))
  app.use(convert(require('koa-bodyparser')()))
}
