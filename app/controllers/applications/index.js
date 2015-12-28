const actions = {
  index: require('./actions/index')
}

const Router = require('koa-router')

const routes = router => {
  const applications = new Router()

  applications.get('/', actions.index)

  router.use('/applications', applications.routes(), applications.allowedMethods())
}

module.exports = {
  actions: actions,
  routes: routes
}
