const actions = {
  login: require('./actions/login')
}

const Router = require('koa-router')

const routes = router => {
  const auth = new Router()

  auth.post('/login', actions.login)

  router.use('/auth', auth.routes(), auth.allowedMethods())
}

module.exports = {
  actions: actions,
  routes: routes
}
