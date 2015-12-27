const co = require('co')
const compose = require('koa-compose')
const validate = require('koa-joi-schema')
const Joi = validate.Joi
const User = require('../../../models/user')

const validator = validate('request.body')(Joi.object().keys({
  email: Joi.string().email().required(),
  profile: Joi.object().keys({
    registration: Joi.object().required()
  }).required()
}))

const create = co.wrap(function *(ctx) {
  const user = yield User.create(ctx.request.body)
  ctx.body = {
    data: user
  }
})

module.exports = compose([validator, create])
