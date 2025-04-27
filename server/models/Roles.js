const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Roles = sequelize.define('Roles', {
    ID: { type: DataTypes.TINYINT, primaryKey: true, autoIncrement: true },
    naimenovanie: { type: DataTypes.STRING(150), allowNull: false }
}, {
    tableName: 'Roles',
    timestamps: false
});

module.exports = Roles;
