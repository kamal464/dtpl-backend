const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const SchematableattrDBO = sequelizeConnection.define('schematableattr', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  attrtype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  serialno: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tablename: {
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
  tableName: 'schematableattr',
  timestamps: false,
});

module.exports = SchematableattrDBO;
