const co = require('co')
const compose = require('koa-compose')
const randomstring = require('randomstring')
const validate = require('koa-joi-schema')
const emails = require('../../../../lib/util/emails')
const Joi = require('joi')
const User = require('../../../models/user')

function buildLink(email, token) {
  return `http://app.hackdfw.com/registration/complete?email=${email}&token=${token}`
}

function sendConfirmationEmail(email, token) {
  return emails.sendTemplate('af2de2ce-ce8e-4b0d-a420-ffa736b86bd0', {
    to: email,
    from: 'confirm',
    fromname: 'HackDFW Team',
    subject: '[ACTION REQUIRED] Confirm your registration for HackDFW',
    text: 'Hey there!\n\n'
      + 'Thanks for registering for HackDFW. To complete your registration, please follow the link below:\n\n'
      + `${buildLink(email, token)}\n\n`
      + 'Regards,\n\nThe HackDFW Team',
    html: 'Hey there!<br /><br />'
      + 'Thanks for registering for HackDFW. To complete your registration, please follow the link below:<br /><br />'
      + `<a href="${buildLink(email, token)}">${buildLink(email, token)}</a><br /><br />`
      + 'Regards,<br /><br />The HackDFW Team',
  })

}

const validator = validate('request.body')(Joi.object().keys({
  email: Joi.string().email().required(),
  profile: Joi.object().keys({
    registration: Joi.object().required()
  }).required()
}))

const create = co.wrap(function *(ctx) {
  const body = ctx.request.body
  const token = body.confirmationToken = randomstring.generate()

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

  yield sendConfirmationEmail(user.email, token)

  ctx.body = {
    data: user
  }
})

module.exports = compose([validator, create])
