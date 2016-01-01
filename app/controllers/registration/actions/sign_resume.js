const co = require('co')
const uuid = require('node-uuid')
const s3 = require('../../../../lib/util/s3')

module.exports = co.wrap(function *(ctx) {
  const query = ctx.request.query
  const filename = uuid.v4() + '_' + query.objectName
  const mimeType = query.contentType
  const key = 'resumes/' + filename

  try {
    const signedUrl = yield s3.signedPutUrl(key, mimeType)
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      error: 'Cannot create S3 signed URL'
    }
    return
  }

  ctx.body = {
    signedUrl: signedUrl,
		key: key
  }
})
