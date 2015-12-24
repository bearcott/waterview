const parseDbUrl = require('parse-database-url')

const url = process.env.DATABASE_URL || 'postgres://localhost/hackdfw_backend_devel'
const dbConfig = parseDbUrl(url)

const knex = require('knex')({
  client: 'postgres',
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
  }
});

module.exports = require('bookshelf')(knex)
console.log(`Connected to database at ${url}`)
