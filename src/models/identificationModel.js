const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const IdentificationDBO = sequelizeConnection.define('identification', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  fkcountryid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  fkempeducationid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  fkempid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  fkempworkhistoryid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  fkidentificationid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  fkorgid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  issuedate: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  issuedby: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
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
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validfromdate: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  validuptodate: {
    type: DataTypes.BIGINT,
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
  tableName: 'identification',
  timestamps: false,
});

module.exports = IdentificationDBO;
