const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Roles = require('./Roles');
const SecretQuestions = require('./SecretQuestions');

const Users = sequelize.define('Users', {
    ID: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, field: 'id' },
    email: { type: DataTypes.STRING(150), allowNull: false },
    password: { type: DataTypes.STRING(150), allowNull: false },
    role: { type: DataTypes.SMALLINT, allowNull: false },
    number: { type: DataTypes.STRING(150), allowNull: false },
    FIO: { type: DataTypes.STRING(150), allowNull: false, field: 'fio' },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'isactivated' }, // Активирована ли учетная запись
    // Это значение меняется на true после авторизации по ссылке в письме после регистрации
    activationLink: { type: DataTypes.STRING, field: 'activationlink' }, // Ссылка для активации аккаунта (уникальный токен, отправляемый на email).
    // Например: 9650ec3e-4eb5-4e5e-a9f0-610bb179fc9a
    // Ссылка активации в коде потом преобразуется в htttp://localhost:5000/api/authorization/auth/activate/9650ec3e-4eb5-4e5e-a9f0-610bb179fc9a
    resetPasswordToken: { type: DataTypes.STRING, field: 'resetpasswordtoken' }, // Токен для сброса пароля (временный ключ, отправляемый пользователю).
    resetPasswordExpires: { type: DataTypes.DATE, field: 'resetpasswordexpires' }, // Срок действия токена сброса пароля.
    secretQuestion: { type: DataTypes.SMALLINT, allowNull: true, field: 'secretquestion' }, // Номер/ID секретного вопроса (например, 1 — "Девичья фамилия матери?").
    answerForSecretQuestion: { type: DataTypes.STRING(150), allowNull: true, field: 'answerforsecretquestion' } // Ответ на секретный вопрос (хранится в хэшированном виде, как пароль).
}, {
    tableName: 'users',
    timestamps: false
});

Users.belongsTo(Roles, { foreignKey: 'role', targetKey: 'id' });
Users.belongsTo(SecretQuestions, { foreignKey: 'secretquestion', targetKey: 'id' });

module.exports = Users;

