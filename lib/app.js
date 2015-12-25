const Koa = require('koa')
const app = new Koa()

const PORT = process.env.PORT || 3005

app.use(ctx => {
  ctx.body = 'Hello, world!'
})

const database = require('./database')

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
