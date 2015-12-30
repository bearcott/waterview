const co = require('co')
const compose = require('koa-compose')
const randomstring = require('randomstring')
const validate = require('koa-joi-schema')
const Joi = require('joi')
const User = require('../../../models/user')

const validator = validate('request.body')(Joi.object().keys({
  email: Joi.string().email().required(),
  profile: Joi.object().keys({
    registration: Joi.object().required()
  }).required()
}))

const create = co.wrap(function *(ctx) {
  const body = ctx.request.body
  body.confirmationToken = randomstring.generate()

  try {
    const user = yield User.create(body)
  } catch (e) {
    if (e.name !== 'SequelizeUniqueConstraintError') throw e
    ctx.status = 400
    ctx.body = {
      message: 'Email already registered.'
    }
    return
  }

  // TODO send confirmation email

  ctx.body = {
    data: user
  }
})

module.exports = compose([validator, create])
