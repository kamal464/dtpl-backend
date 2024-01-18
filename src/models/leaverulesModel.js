const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const LeaveRule = sequelizeConnection.define('leaverules', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  employementtype: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: true },
  startyear: { type: DataTypes.INTEGER, allowNull: true },
  endyear: { type: DataTypes.INTEGER, allowNull: true },
  permonth: { type: DataTypes.INTEGER, allowNull: true },
  maxleavesinyear: { type: DataTypes.INTEGER, allowNull: true },
  holidayscount: { type: DataTypes.INTEGER, allowNull: true },
  weekendcount: { type: DataTypes.INTEGER, allowNull: true },
  actualfrequency: { type: DataTypes.STRING, allowNull: true },
  actualperiod: { type: DataTypes.INTEGER, allowNull: true },
  accrualamount: { type: DataTypes.FLOAT, allowNull: true },
  carryforward: { type: DataTypes.BOOLEAN, allowNull: true },
  maxcarryforward: { type: DataTypes.INTEGER, allowNull: true },
  maxallowedrequest: { type: DataTypes.INTEGER, allowNull: true },
  maxallowedmonth: { type: DataTypes.INTEGER, allowNull: true },
  negativebalancecredits: { type: DataTypes.BOOLEAN, allowNull: true },
  convertionnegativebalancetolop: { type: DataTypes.BOOLEAN, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'leaverules',
  timestamps: false,
});

module.exports = LeaveRule;
