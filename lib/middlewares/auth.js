const compose = require('koa-compose')
const convert = require('koa-convert')
const jwt = require('koa-jwt')
const constants = require('../constants')

const decodeJwt = convert(jwt({
  secret: constants.SESSION_SECRET,
  passthrough: true
}))

module.exports = compose([decodeJwt])
