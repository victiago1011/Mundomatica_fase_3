const { DataTypes } = require('sequelize');
const db = require("../db");

const User = db.define('usuario', {
    login: DataTypes.STRING,
    password: DataTypes.STRING
});

module.exports = User;