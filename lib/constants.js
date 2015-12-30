module.exports = {
  SESSION_SECRET: process.env.SESSION_SECRET || 'test',
  SESSION_EXPIRY: 60 * 4 // 4 hours
}
