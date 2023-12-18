const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');  // Assuming you have configured Sequelize connection

const Empsalary = sequelizeConnection.define('empsalary', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  costpermanhour: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  ctcmonthly: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  effictivedate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  enddate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fkempid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  netmonthly: {
    type: DataTypes.NUMERIC,
    allowNull: false,
  },
  remarks: {
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
  tableName: 'empsalary',
  timestamps: false,
});

module.exports = Empsalary;
