const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib'); 

const Empresign = sequelizeConnection.define('Empresign', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  appliedbyfkempid: { type: DataTypes.STRING, allowNull: false },
  applieddate: { type: DataTypes.STRING, allowNull: false },
  approvinghrfkempid: { type: DataTypes.BIGINT, allowNull: true },
  approvingmanagerfkempid: { type: DataTypes.BIGINT, allowNull: true },
  empcomments: { type: DataTypes.STRING, allowNull: false },
  fkempid: { type: DataTypes.BIGINT, allowNull: false },
  hrapprovaldate: { type: DataTypes.INTEGER, allowNull: true },
  hrapprovedexitdate: { type: DataTypes.STRING, allowNull: false },
  hrcomments: { type: DataTypes.STRING, allowNull: false },
  isactive: { type: DataTypes.INTEGER, allowNull: true },
  managerapprovaldate: { type: DataTypes.INTEGER, allowNull: true },
  managerapprovedexitdate: { type: DataTypes.STRING, allowNull: false },
  managercomments: { type: DataTypes.STRING, allowNull: false },
  reason: { type: DataTypes.STRING, allowNull: true },
  requestedexitdate: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'empresign',
  timestamps: false,
});

module.exports = Empresign;
