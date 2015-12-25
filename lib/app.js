const Koa = require('koa')
const database = require('./database')
const app = new Koa()

const PORT = process.env.PORT || 3005

app.use(ctx => {
  ctx.body = 'Hello, world!'
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
