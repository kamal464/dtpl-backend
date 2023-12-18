const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');
const EmpdependentDBO = sequelizeConnection.define('empdependent', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  birthdate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dependentname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fkempid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  relationtype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewdate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reviewedbyfkempid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  sid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rss: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lct: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lmt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sct: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  smt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false, // Set this to false if you don't want createdAt and updatedAt columns
  tableName: 'empdependent', // Set the table name explicitly if it's different from the model name
});

module.exports = EmpdependentDBO;
