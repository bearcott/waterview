const Sequelize = require('sequelize')
const database = require('../../lib/database')

module.exports = database.define('user', {

  email: {
    type: Sequelize.STRING
  },

  password: {
    type: Sequelize.STRING
  },

  confirmationToken: {
    type: Sequelize.STRING,
    field: 'confirmation_token'
  },

  confirmedAt: {
    type: Sequelize.DATE,
    field: 'confirmed_at'
  },

  profile: {
    type: Sequelize.JSONB
  }

})
