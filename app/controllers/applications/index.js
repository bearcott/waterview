const actions = {
  create: require('./actions/create'),
  show: require('./actions/show'),
  update: require('./actions/update')
}

const middlewares = {
  find: require('./middlewares/find')
}

const _ = require('koa-route')

const routes = router => {
  router.post('/applications', actions.create)
  router.put('/applications/:id', actions.update)
  router.patch('/applications/:id', actions.update)
}

module.exports = {
  actions: actions,
  routes: routes
}
