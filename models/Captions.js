const Sequelize = require('sequelize');
const db = require('db_setup.js');

const Caption = db.define('caption', {
   id: {
      type: Sequelize.INTEGER
   },
   image_id: {
      type: Sequelize.INTEGER
   },
   user_id: {
      type: Sequelize.INTEGER
   },
   caption: {
      type: Sequelize.STRING
   }
});

module.exports = Caption;