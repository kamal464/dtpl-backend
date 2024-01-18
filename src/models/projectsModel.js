const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Project = sequelizeConnection.define('projects', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkcompanyid: { type: DataTypes.BIGINT, allowNull: true },
  projectcode: { type: DataTypes.STRING, allowNull: true },
  projectstatus: { type: DataTypes.STRING, allowNull: true },
  projectstartingdate: { type: DataTypes.INTEGER, allowNull: true },
  projectendingdate: { type: DataTypes.INTEGER, allowNull: true },
  remarks: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'projects',
  timestamps: false,
});

module.exports = Project;
