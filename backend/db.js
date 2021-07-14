const Sequelize = require('sequelize')

require('dotenv').config();

const db = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASS, {
    host: process.env.DBHOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

module.exports = db;