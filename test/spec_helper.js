const database = require('../lib/database')

before('setup database', function *() {
  yield database.drop()
  yield database.sync()
});

after(function *() {
  yield database.drop()
})
