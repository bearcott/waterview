const constants = require('./constants')
const Sequelize = require('sequelize')

const opts = {}

if (process.env.NODE_ENV === 'test') opts.logging = false

module.exports = new Sequelize(constants.DATABASE_URL, opts)
console.log(`Connected to database at ${constants.DATABASE_URL}`)

// Load models
require('../app/models/user')
