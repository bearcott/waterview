const actions = {
  index: require('./actions/index')
}

const Router = require('koa-router')

const routes = router => {
  router.get(/^\/uploads\/(.*)/, actions.index)
}

module.exports = {
  routes: routes
}
