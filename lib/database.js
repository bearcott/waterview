const Sequelize = require('sequelize')

const url = process.env.DATABASE_URL ||
  'postgres://localhost/waterview_' + (process.env.NODE_ENV === 'test' ? 'test' : 'devel')

const opts = {}

if (process.env.NODE_ENV === 'test') opts.logging = false

module.exports = new Sequelize(url, opts)
console.log(`Connected to database at ${url}`)

// Load models
require('../app/models/user')
