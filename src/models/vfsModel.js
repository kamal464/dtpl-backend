const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Vfs = sequelizeConnection.define('vfs', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  displayname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  filemimetype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  filesizeinbytes: {
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
  fkvfsid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  gpslat: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gpslong: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isfolder: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  relativepath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  uploadedbyfkempid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  watermarktext: {
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
  tableName: 'vfs', // Set the table name
  timestamps: false, // Disable timestamps
  // Additional configuration options can be added here
});

module.exports = Vfs;
