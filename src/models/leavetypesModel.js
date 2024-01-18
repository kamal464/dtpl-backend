const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const LeaveType = sequelizeConnection.define('leavetypes', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  leavetype: { type: DataTypes.STRING, allowNull: true },
  code: { type: DataTypes.STRING, allowNull: true },
  startyear: { type: DataTypes.INTEGER, allowNull: true },
  endyear: { type: DataTypes.INTEGER, allowNull: true },
  maxleavespermonth: { type: DataTypes.INTEGER, allowNull: true },
  maxleavesperyear: { type: DataTypes.INTEGER, allowNull: true },
  holidayscount: { type: DataTypes.INTEGER, allowNull: true },
  weekendcount: { type: DataTypes.INTEGER, allowNull: true },
  accrualfrequency: { type: DataTypes.STRING, allowNull: true },
  accrualperiod: { type: DataTypes.INTEGER, allowNull: true },
  accrualamount: { type: DataTypes.FLOAT, allowNull: true },
  carryforward: { type: DataTypes.BOOLEAN, allowNull: true },
  maxcarryforward: { type: DataTypes.INTEGER, allowNull: true },
  maxallowedinrequest: { type: DataTypes.INTEGER, allowNull: true },
  maxallowedinmonth: { type: DataTypes.INTEGER, allowNull: true },
  negativebalancecredits: { type: DataTypes.BOOLEAN, allowNull: true },
  negativebalancetolop: { type: DataTypes.BOOLEAN, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'leavetypes',
  timestamps: false,
});

module.exports = LeaveType;
