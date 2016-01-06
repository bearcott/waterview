const co = require('co')
const compose = require('koa-compose')
const validate = require('koa-joi-schema')
const Joi = require('joi')

const User = require('../../../models/user')
const emails = require('../../../../lib/util/emails')

const validator = validate('request.body')(Joi.object().keys({
  email: Joi.string().email().required()
}))

const forgotPassword = co.wrap(function *(ctx) {
  const email = ctx.request.body.email

  const user = yield User.findOne({
    where: {
      email: email
    }
  })

  if (!user) {
    ctx.status = 404
    ctx.body = {
      error: 'That email does not exist in our database.'
    }
    return
  }

  yield sendForgotPasswordEmail(user.email)

  ctx.body = {
    email: email
  }
})

module.exports = compose([validator, forgotPassword])
