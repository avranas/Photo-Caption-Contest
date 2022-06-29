const Sequelize = require('sequelize');
const db = require('db_setup.js');

const User = db.define('user', {
   id: {
      type: Sequelize.INTEGER
   },
   username: {
      type: Sequelize.STRING
   },
   password: {
      type: Sequelize.STRING
   }
});

module.exports = User;