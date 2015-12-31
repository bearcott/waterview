module.exports = {
  SESSION_SECRET: process.env.SESSION_SECRET || 'test',
  SESSION_EXPIRY: 60 * 4, // 4 hours
  SENDGRID_TOKEN: process.env.SENDGRID_TOKEN,
  SENDGRID_DOMAIN: process.env.SENDGRID_DOMAIN || 'mail.hackdfw.com'
}
