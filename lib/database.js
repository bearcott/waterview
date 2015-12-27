const Sequelize = require('sequelize')

const url = process.env.DATABASE_URL ||
  'postgres://localhost/waterview_' + (process.env.NODE_ENV === 'test' ? 'test' : 'devel')
module.exports = new Sequelize(url)
console.log(`Connected to database at ${url}`)

// Load models
require('../app/models/user')
