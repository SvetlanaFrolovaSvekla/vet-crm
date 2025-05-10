const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SecretQuestions = sequelize.define('secretQuestions', {
    ID: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
    naimenovanie: { type: DataTypes.STRING(150), allowNull: false } // Название секретного вопроса
}, {
    tableName: 'secretQuestions',
    timestamps: false
});

module.exports = SecretQuestions;