const constants = require('../constants')
const promisify = require('es6-promisify')
const sendgrid = require('sendgrid')(constants.SENDGRID_TOKEN)

function send(email) {
  // Don't send on test env
  if (process.env.NODE_ENV === 'test') return Promise.resolve(true)
  return promisify(sendgrid.send.bind(sendgrid))(email)
}

function buildEmail(opts) {
  const email = new sendgrid.Email()
  Object.assign(email, opts)
  email.from = email.from + '@' + constants.SENDGRID_DOMAIN
  return email
}

function sendEmail(opts) {
  return send(buildEmail(opts))
}

function sendTemplate(template, opts) {
  const email = buildEmail(opts)
  email.setFilters({
    templates: {
      settings: {
        enable: 1,
        template_id: template
      }
    }
  })
  return send(email)
}

module.exports = {
  sendEmail: sendEmail,
  sendTemplate: sendTemplate
}
