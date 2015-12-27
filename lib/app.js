require('loud-rejection/register')

const Koa = require('koa')
const app = module.exports = new Koa()
app.use(require('koa-bodyparser')())

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
