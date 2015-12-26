require('loud-rejection/register')

const Koa = require('koa')
const app = new Koa()
app.use(require('koa-bodyparser')())

const routes = require('./routes')
app.use(routes.routes())
app.use(routes.allowedMethods())

const database = require('./database')

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
