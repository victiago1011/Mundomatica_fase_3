const { DataTypes } = require('sequelize');
const db = require("../db");

const Alternativa = db.define('alternativa', {
    valor_alternativa: DataTypes.STRING,
    correta: DataTypes.BOOLEAN
});

module.exports = Alternativa;