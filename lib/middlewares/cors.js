const co = require('co')

module.exports = co.wrap(function *(ctx, next) {
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  ctx.set('Access-Control-Allow-Origin', '*')
  yield next()
})
