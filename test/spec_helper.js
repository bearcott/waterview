const database = require('../lib/database')

beforeEach('setup database', function *() {
  yield database.drop()
  yield database.sync()
});

after(function *() {
  yield database.drop()
})
