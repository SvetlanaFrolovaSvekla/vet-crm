const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Roles = sequelize.define('Roles', {
    ID: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, field: 'id' },
    naimenovanie: { type: DataTypes.STRING(150), allowNull: false }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Roles;
