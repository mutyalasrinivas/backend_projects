 // models/downloadedfile.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class DownloadedFile extends Model {}

DownloadedFile.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  downloadDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'downloadedfile'
});

module.exports = DownloadedFile;
