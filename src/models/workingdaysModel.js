const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const WorkingDays = sequelizeConnection.define('workingdays', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkprojectid: { type: DataTypes.BIGINT, allowNull: true },
  officename: { type: DataTypes.STRING, allowNull: true },
  projectname: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: true },
  year: { type: DataTypes.INTEGER, allowNull: true },
  typeofworkingdays: { type: DataTypes.STRING, allowNull: true },
  holidaydescription: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'workingdays',
  timestamps: false,
});

module.exports = WorkingDays;
