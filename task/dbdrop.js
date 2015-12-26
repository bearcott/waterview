console.log('Dropping tables...')
const database = require('../lib/database')
database.drop().then(() => {
  console.log('Tables dropped.')
  database.close()
})
