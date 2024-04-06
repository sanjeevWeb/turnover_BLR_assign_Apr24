const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const UserChkProduct = sequelize.define('UserChkProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId: {
        type: DataTypes.INTEGER,
    },
    CheckedProductId: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'user_checked_products' // Optional
});

module.exports = UserChkProduct;
