const Sequelize = require('sequelize');
const db = require('./db_setup.js');

const Caption = db.define('caption', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   image_id: {
      type: Sequelize.INTEGER,
      allowNull: false
   },
   user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
   },
   caption: {
      type: Sequelize.STRING,
      allowNull: false
   }
}, {
   timestamps: false
});

module.exports = Caption;