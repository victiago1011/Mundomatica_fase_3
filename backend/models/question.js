const { DataTypes } = require('sequelize');
const db = require("../db");
const Alternativa = require("./alternativa");

const Question = db.define('questao', {
    enunciado: DataTypes.STRING,
	pontuacao: DataTypes.INTEGER
});

Question.hasMany(Alternativa, {
    foreignKey: {
        name: 'id_questao'
    }
});

module.exports = Question;