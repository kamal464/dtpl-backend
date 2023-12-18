const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Setting = sequelizeConnection.define('setting', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  fkorgid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  group: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ict: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  imt: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  iseditable: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
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
  
  sct: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  smt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'setting', // Set the table name
  timestamps: false, // Disable timestamps
  // Additional configuration options can be added here
});

module.exports = Setting;
