const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const CheckedProduct = sequelize.define('CheckedProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'checked_products' // Optional
});

module.exports = CheckedProduct;
