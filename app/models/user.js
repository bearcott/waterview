const Sequelize = require('sequelize')
const database = require('../../lib/database')

module.exports = database.define('user', {

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: Sequelize.STRING
  },

  confirmationToken: {
    type: Sequelize.STRING
  },

  confirmedAt: {
    type: Sequelize.DATE
  },

  profile: {
    type: Sequelize.JSONB,
    defaultValue: {}
  }

})
