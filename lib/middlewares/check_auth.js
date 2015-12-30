const convert = require('koa-convert')
const jwt = require('koa-jwt')

cosnt SECRET = process.env.SESSION_SECRET || 'test'

module.exports = convert(jwt({
  secret: SECRET
}))
