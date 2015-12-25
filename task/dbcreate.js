console.log('Creating tables...')
const database = require('../lib/database')
database.sync().then(() => {
  console.log('Tables created.')
  database.close()
})
