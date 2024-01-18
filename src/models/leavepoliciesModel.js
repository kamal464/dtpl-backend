const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const LeavePolicy = sequelizeConnection.define('leavepolicies', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  policystatus: { type: DataTypes.STRING, allowNull: true },
  creditstatus: { type: DataTypes.STRING, allowNull: true },
  closurestatus: { type: DataTypes.STRING, allowNull: true },
  carryforwardstatus: { type: DataTypes.STRING, allowNull: true },
  leavepolicydescription: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'leavepolicies',
  timestamps: false,
});

module.exports = LeavePolicy;
