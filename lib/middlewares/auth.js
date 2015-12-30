const compose = require('koa-compose')
const convert = require('koa-convert')
const jwt = require('koa-jwt')

const SECRET = process.env.SESSION_SECRET || 'test'

const decodeJwt = convert(jwt({
  secret: SECRET,
  passthrough: true
}))

module.exports = compose([decodeJwt])
