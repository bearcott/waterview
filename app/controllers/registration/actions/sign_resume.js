const aws = require('aws-sdk')
const co = require('co')
const constants = require('../../../../lib/constants')
const promisify = require('es6-promisify')
const uuid = require('node-uuid')

const s3 = new aws.S3()

module.exports = co.wrap(function *(ctx) {
  const query = ctx.request.query
  const filename = uuid.v4() + '_' + query.objectName
  const mimeType = query.contentType
  const fileKey = `/resumes/${filename}`

  const params = {
    Bucket: constants.AWS_RESUME_BUCKET,
    Key: fileKey,
    Expires: 60,
    ContentType: mimeType,
    ACL: 'private'
  }

  const getSignedUrl = promisify(s3.getSignedUrl.bind(s3))
  try {
    const signedUrl = yield getSignedUrl('putObject', params)
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      error: 'Cannot create S3 signed URL'
    }
    return
  }

  res.json({
    signedUrl: data,
    publicUrl: '/s3/uploads/' + filename,
    filename: filename
  });
})
