const Sequelize = require('sequelize');
const db = require('db_setup.js');

const Image = db.define('image', {
   id: {
      type: Sequelize.INTEGER
   },
   image_location: {
      type: Sequelize.STRING
   }
});

module.exports = Caption;