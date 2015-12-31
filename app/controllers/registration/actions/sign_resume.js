const co = require('co')
const uuid = require('node-uuid')
const s3 = require('../../../../lib/util/s3')

module.exports = co.wrap(function *(ctx) {
  const query = ctx.request.query
  const filename = uuid.v4() + '_' + query.objectName
  const mimeType = query.contentType
  const file = `/resumes/${filename}`

  try {
    const signedUrl = yield s3.signedPutUrl(file, mimeType)
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      error: 'Cannot create S3 signed URL'
    }
    return
  }

  res.json({
    signedUrl: signedUrl,
    publicUrl: '/s3/uploads/' + filename,
    filename: filename
  });
})
