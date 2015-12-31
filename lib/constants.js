module.exports = Object.assign({
  AWS_RESUME_BUCKET: 'hackdfw-resumes',
  SESSION_SECRET: 'test',
  SESSION_EXPIRY: 60 * 4, // 4 hours
  SENDGRID_DOMAIN: 'mail.hackdfw.com',
  DATABASE_URL: 'postgres://localhost/waterview_' + (process.env.NODE_ENV === 'test' ? 'test' : 'devel')
}, process.env)
