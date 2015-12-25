const Koa = require('koa')
const app = new Koa()

const routes = require('./routes')
routes(app)

const database = require('./database')

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
