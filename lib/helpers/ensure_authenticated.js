module.exports = function (ctx, next) {
  if (!ctx.state.user) {
    ctx.stats = 401
    ctx.body = {
      error: 'Protected resource; use Authorization header to get access.'
    }
    return
  }
  return next()
}
