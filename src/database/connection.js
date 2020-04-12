const knex = require('knex')

const env = process.env.DB_ENV || 'development'
const configuration = require('../../knexfile')

const connection = knex(configuration[env])

module.exports = connection
