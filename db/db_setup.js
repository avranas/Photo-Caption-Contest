const { Sequelize } = require('sequelize');
require("dotenv").config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
   host: process.env.DB_HOST,
   dialect: 'postgres',
   //I'm not sure if I need this, but it was in the tutorial
   pool: {
      max: 5,
      min: 0,
      aquire: 30000,
      idle: 10000
   },
   port: 5432,
   timestamps: false,
   freezeTableName: true
});

//Test database connection
db.authenticate()
   .then(() => console.log('Connection to database successful'))
   .catch(err => console.log('Connection to database unsuccessful :( ' + err));

module.exports = db;
