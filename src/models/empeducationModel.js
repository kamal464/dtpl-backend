const { DataTypes } = require('sequelize');
const {sequelizeConnection} = require('../lib/mqsqlLib'); // Adjust the path based on your project structure

const Empeducation = sequelizeConnection.define('Empeducation', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fkempid: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  fromDate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  institute: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reviewdate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reviewedbyfkempid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  score: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scoremax: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scoremetric: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  toDate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
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
  tableName: 'empeducation',
  timestamps: false,
});

module.exports = Empeducation;
