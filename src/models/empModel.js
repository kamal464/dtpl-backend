// empModel.js

const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Emp = sequelizeConnection.define('Emp', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  confirmationdate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  displayname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exitdate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fkorgid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  givenname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  joiningdate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  latestfkempofficialid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  resignationdate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rss: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lct: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lmt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sct: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  smt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'emp',
  timestamps: false,
});

module.exports = Emp;
