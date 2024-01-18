const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const ResignApplication = sequelizeConnection.define('resignapplication', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  requestfor: { type: DataTypes.STRING, allowNull: true },
  type: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: true },
  applieddate: { type: DataTypes.DATE, allowNull: true },
  supervisor: { type: DataTypes.STRING, allowNull: true },
  manager: { type: DataTypes.STRING, allowNull: true },
  lastworkingdate: { type: DataTypes.DATE, allowNull: true },
  approvedby: { type: DataTypes.STRING, allowNull: true },
  reasonforresignation: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'resignapplication',
  timestamps: false,
});

module.exports = ResignApplication;
