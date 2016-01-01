const aws = require('aws-sdk')
const constants = require('../constants')
const promisify = require('es6-promisify')

const s3 = new aws.S3()
const getSignedUrl = promisify(s3.getSignedUrl.bind(s3))

function signedGetUrl(key) {
  return getSignedUrl('getObject', {
    Bucket: constants.AWS_RESUME_BUCKET,
    Key: key
  })
}

function signedPutUrl(key, mimeType) {
  return getSignedUrl('putObject', {
    Bucket: constants.AWS_RESUME_BUCKET,
    Key: key,
    Expires: 60,
    ContentType: mimeType,
    ACL: 'private'
  })
}

module.exports = {
  signedGetUrl: signedGetUrl,
  signedPutUrl: signedPutUrl
}
