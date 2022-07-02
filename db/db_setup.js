const { Sequelize } = require('sequelize');

const db = new Sequelize('photo caption contest', 'alex', 'password', {
   host: 'localhost',
   dialect: 'postgres',
   //I'm not sure if I need this, but it was in the tutorial
   pool: {
      max: 5,
      min: 0,
      aquire: 30000,
      idle: 10000
   },
   timestamps: false,
   freezeTableName: true
});

//Test database connection
db.authenticate()
   .then(() => console.log('Connection to database successful'))
   .catch(err => console.log('Connection to database unsuccessful :( ' + err));

module.exports = db;
