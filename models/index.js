const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

console.log('Initialisation de Sequelize !');
// Sequilize init
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: 3307,
    dialect: dbConfig.dialect,

    pool : {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.authenticate()
.then(() => {
    console.log('Connected to the Database (models/index.js) !');
})
.catch(err => {
    console.log('Unable to connect to the database : ', err);
})

db.users = require('./User.model')(sequelize, Sequelize);

module.exports = db;