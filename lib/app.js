require('loud-rejection/register')

const convert = require('koa-convert')
const Koa = require('koa')

const app = module.exports = new Koa()
require('./middlewares')(app)
require('./routes')(app)

const database = require('./database')

const PORT = process.env.PORT || 3005
if (!module.parent) app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
