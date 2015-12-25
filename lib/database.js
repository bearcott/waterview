const Sequelize = require('sequelize')

const url = process.env.DATABASE_URL || 'postgres://localhost/waterview_devel'
module.exports = new Sequelize(url)
console.log(`Connected to database at ${url}`)
