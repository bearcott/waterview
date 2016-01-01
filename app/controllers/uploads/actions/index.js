const co = require('co')
const s3 = require('../../../../lib/util/s3')

module.exports = co.wrap(function *(ctx) {
  const key = ctx.captures[0]
  if (!key) {
    ctx.status = 404
    ctx.body = {
      error: 'Not Found'
    }
    return
  }

  try {
    const url = yield s3.signedGetUrl(key)
    ctx.redirect(url)
  } catch (e) {
    ctx.status = 404
    ctx.body = {
      error: 'Not Found'
    }
    return
  }
})
