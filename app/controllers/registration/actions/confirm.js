const co = require('co')
const compose = require('koa-compose')
const validate = require('koa-joi-schema')
const Joi = require('joi')
const User = require('../../../models/user')

const validator = validate('request.query')(Joi.object().keys({
  email: Joi.string().email().required(),
  confirmationToken: Joi.string().required()
}))

const confirm = co.wrap(function *(ctx) {
  const user = yield User.find(ctx.request.query)
  if (!user) {
    ctx.status = 400
    ctx.body = {
      error: 'Invalid confirmation token'
    }
    return
  }
  ctx.body = {
    valid: true
  }
})

module.exports = compose([validator, confirm])
