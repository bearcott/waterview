const actions = {
  complete: require('./actions/complete'),
  confirm: require('./actions/confirm'),
  create: require('./actions/create'),
  sign_resume: require('./actions/sign_resume')
}

const Router = require('koa-router')

const routes = router => {
  const registration = new Router()

  registration.post('/complete', actions.complete)
  registration.get('/confirm', actions.confirm)
  registration.post('/create', actions.create)
  registration.get('/sign_resume', actions.sign_resume)

  router.use('/registration', registration.routes(), registration.allowedMethods())
}

module.exports = {
  actions: actions,
  routes: routes
}
