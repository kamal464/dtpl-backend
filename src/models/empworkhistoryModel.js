const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Empworkhistory = sequelizeConnection.define('empworkhistory', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  designation: { type: DataTypes.STRING, allowNull: true },
  employer: { type: DataTypes.STRING, allowNull: true },
  fkempid: { type: DataTypes.BIGINT, allowNull: false },
  fromdate: { type: DataTypes.INTEGER, allowNull: false },
  isactive: { type: DataTypes.INTEGER, allowNull: true },
  isrelevant: { type: DataTypes.INTEGER, allowNull: true },
  reviewdate: { type: DataTypes.INTEGER, allowNull: true },
  reviewedbyfkempid: { type: DataTypes.BIGINT, allowNull: true },
  roles: { type: DataTypes.STRING, allowNull: true },
  todate: { type: DataTypes.INTEGER, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'empworkhistory',
  timestamps: false,
});

module.exports = Empworkhistory;
