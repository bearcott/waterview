const actions = {
  confirm: require('./actions/confirm'),
  create: require('./actions/create'),
  register: require('./actions/register'),
  show: require('./actions/show'),
  update: require('./actions/update')
}

const middlewares = {
  find: require('./middlewares/find')
}

const Router = require('koa-router')

const routes = router => {
  const users = new Router()

  users.post('/', actions.create)
  users.get('/confirm', actions.confirm)
  users.post('/register', actions.register)
  users.get('/:id', actions.show)
  users.put('/:id', actions.update)
  users.patch('/:id', actions.update)

  router.use('/users', users.routes(), users.allowedMethods())
}

module.exports = {
  actions: actions,
  routes: routes
}
