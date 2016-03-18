const actions = {
  forgotPassword: require('./actions/forgot_password'),
  login: require('./actions/login'),
  refresh: require('./actions/refresh'),
  get_profile: require('./actions/get_profile')
}

const Router = require('koa-router')

const routes = router => {
  const auth = new Router()

  auth.post('/forgot_password', actions.forgotPassword)
  auth.post('/login', actions.login)
  auth.post('/refresh', actions.refresh)
  auth.post('/get_profile', actions.get_profile)

  router.use('/auth', auth.routes(), auth.allowedMethods())
}

module.exports = {
  actions: actions,
  routes: routes
}
