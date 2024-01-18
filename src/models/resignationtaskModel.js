const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const ResignationTask = sequelizeConnection.define('resignationtask', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  taskname: { type: DataTypes.STRING, allowNull: true },
  taskdescription: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: true },
  targetdate: { type: DataTypes.DATE, allowNull: true },
  lastworkingdate: { type: DataTypes.DATE, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'resignationtask',
  timestamps: false,
});

module.exports = ResignationTask;
