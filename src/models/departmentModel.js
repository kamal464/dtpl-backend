const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Department = sequelizeConnection.define('Department', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  fkofficeid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  fkorgid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  hodfkempid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'department',
  timestamps: false,
});

module.exports = Department;
