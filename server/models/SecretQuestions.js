const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SecretQuestions = sequelize.define('SecretQuestions', {
    ID: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true,
        field: 'id' }, // Указываем, что в БД столбец называется 'id'},
    naimenovanie: { type: DataTypes.STRING(150), allowNull: false } // Название секретного вопроса
}, {
    tableName: 'secretquestions',
    timestamps: false
});

module.exports = SecretQuestions;