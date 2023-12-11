// Assuming you have a Sequelize instance named sequelizeConnection

const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Schematable = sequelizeConnection.define('Schematable', {
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
  modulename: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  featurename: {
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
  tableName: 'schematable',
  timestamps: false, // Assuming you don't have timestamp columns (created_at, updated_at)
});

module.exports = Schematable;
