const Sequelize = require('sequelize');
const db = require('./db_setup.js');

const Image = db.define('image', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   image_location: {
      type: Sequelize.STRING,
      allowNull: false
   }
}, {
   timestamps: false
});

module.exports = Image;