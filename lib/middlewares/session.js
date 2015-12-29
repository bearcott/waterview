const convert = require('koa-convert')

const session = require('koa-generic-session')
const redis = require('redis')
const redisStore = require('koa-redis')

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost'

module.exports = convert(session({
  store: redisStore({
    client: redis.createClient(REDIS_URL)
  })
}))

console.log(`Connected to Redis at ${REDIS_URL}`)
