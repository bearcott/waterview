require('loud-rejection/register')

const convert = require('koa-convert')

const Koa = require('koa')

const app = module.exports = new Koa()
app.keys = [process.env.SESSION_SECRET || 'test']
app.use(convert(require('koa-bodyparser')()))
app.use(convert(require('koa-session-redis3')({
  store: {
    port: process.env.REDIS_URL || 'redis://localhost',
    host: {}
  }
})))

const middlewares = require('./middlewares')
app.use(middlewares.errorHandler)

const routes = require('./routes')
app.use(routes.routes())
app.use(routes.allowedMethods())

const database = require('./database')

const PORT = process.env.PORT || 3005
if (!module.parent) app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
