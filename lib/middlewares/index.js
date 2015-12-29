const convert = require('koa-convert')

module.exports = app => {

  app.use(require('./error_handler'))

  app.keys = [process.env.SESSION_SECRET || 'test']
  app.use(require('./session'))

  app.use(convert(require('koa-bodyparser')()))

}
