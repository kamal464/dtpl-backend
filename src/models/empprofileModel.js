const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Empprofile = sequelizeConnection.define('Empprofile', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  contactstatus: { type: DataTypes.STRING, allowNull: false },
  dependantstatus: { type: DataTypes.STRING, allowNull: false },
  educationstatus: { type: DataTypes.STRING, allowNull: false },
  fkempid: { type: DataTypes.BIGINT, allowNull: false },
  identificationstatus: { type: DataTypes.STRING, allowNull: false },
  officialstatus: { type: DataTypes.STRING, allowNull: false },
  personalstatus: { type: DataTypes.STRING, allowNull: false },
  salarystatus: { type: DataTypes.STRING, allowNull: false },
  workhistorystatus: { type: DataTypes.STRING, allowNull: false },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'empprofile',
  timestamps: false,
});

module.exports = Empprofile;
