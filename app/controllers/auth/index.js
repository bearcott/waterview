const actions = {
  login: require('./actions/login'),
  refresh: require('./actions/refresh')
}

const Router = require('koa-router')

const routes = router => {
  const auth = new Router()

  auth.post('/login', actions.login)
  auth.post('/refresh', actions.refresh)

  router.use('/auth', auth.routes(), auth.allowedMethods())
}

module.exports = {
  actions: actions,
  routes: routes
}
