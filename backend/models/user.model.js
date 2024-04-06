const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    timestamps: false,
    tableName: 'users' 
});

module.exports = User;
