// empContactModel.js

const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const EmpContact = sequelizeConnection.define('EmpContact', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  contactname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fkempid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'empcontact',
  timestamps: false,
});

module.exports = EmpContact;
