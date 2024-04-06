// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT || 5432, // Default PostgreSQL port is 5432
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: process.env.DATABASE_SSL ? { rejectUnauthorized: false } : false // Enable SSL connection if DATABASE_SSL is set
//     }
// });

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// module.exports = sequelize;


const { Sequelize } = require('sequelize');

// Remote PostgreSQL connection string
const DATABASE_URL = process.env.DATABASE_URL; 

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
