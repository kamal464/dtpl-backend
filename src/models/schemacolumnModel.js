const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const SchemacolumnDBO = sequelizeConnection.define('schemacolumn', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  tablename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  columnname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  columntype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  datatype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isnull: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  defaultvalue: {
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
  tableName: 'schemacolumn',
  timestamps: false,
});

module.exports = SchemacolumnDBO;
