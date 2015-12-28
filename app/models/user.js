const bcrypt = require('bcrypt')
const co = require('co')
const promisify = require('es6-promisify')
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

  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'hacker'
  },

  profile: {
    type: Sequelize.JSONB,
    defaultValue: {}
  }

}, {

  instanceMethods: {

    comparePassword: function (password) {
      if (typeof this.password === 'undefined') return Promise.resolve(false)
      return promisify(bcrypt.compare)(password, this.password)
    },

    setPassword: co.wrap(function *(password) {
      const salt = yield promisify(bcrypt.genSalt)(10)
      const hash = yield promisify(bcrypt.hash)(password, salt)
      this.password = hash
    })

  }

})
