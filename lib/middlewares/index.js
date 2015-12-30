const convert = require('koa-convert')

module.exports = app => {
  app.use(require('./error_handler'))
  app.use(convert(require('koa-bodyparser')()))
}
