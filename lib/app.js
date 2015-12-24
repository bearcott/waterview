const Koa = require('koa')
const app = new Koa()
const database = require('./database')

const PORT = process.env.PORT || 3005

app.use(ctx => {
  ctx.body = 'Hello, world!'
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
