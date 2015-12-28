const co = require('co')
const compose = require('koa-compose')
const validate = require('koa-joi-schema')
const Joi = require('joi')
const User = require('../../../models/user')

const validator = validate('request.body')(Joi.object().keys({
  email: Joi.string().email().required(),
  confirmationToken: Joi.string().required(),
  password: Joi.string().required()
}))

const register = co.wrap(function *(ctx) {
  const body = ctx.request.body
  const user = yield User.find({
    email: body.email,
    confirmatonToken: body.confirmationToken
  })
  if (!user) {
    ctx.status = 400
    ctx.body = {
      error: 'Invalid confirmation token'
    }
    return
  }
  user.confirmedAt = new Date()
  yield user.setPassword(body.password)
  yield user.save()
  ctx.body = {
    success: true
  }
})

module.exports = compose([validator, register])
