const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const ReasonitemDBO = sequelizeConnection.define('reasonitem', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fkreasonid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  iseditable: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  serialno: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  tableName: 'reasonitem',
  timestamps: false,
});

module.exports = ReasonitemDBO;
