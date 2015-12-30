const actions = {
  complete: require('./actions/complete'),
  confirm: require('./actions/confirm'),
  create: require('./actions/create')
}

const Router = require('koa-router')

const routes = router => {
  const registration = new Router()

  registration.post('/complete', actions.complete)
  registration.get('/confirm', actions.confirm)
  registration.post('/create', actions.create)

  router.use('/registration', registration.routes(), registration.allowedMethods())
}

module.exports = {
  actions: actions,
  routes: routes
}
