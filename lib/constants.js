module.exports = Object.assign({
  AWS_RESUME_BUCKET: 'hackdfw-resumes',
  SESSION_SECRET: 'test',
  SESSION_EXPIRY: 60 * 4, // 4 hours
  SENDGRID_DOMAIN: 'mail.hackdfw.com'
}, process.env)
