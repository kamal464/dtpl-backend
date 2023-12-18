const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Webmenu = sequelizeConnection.define('webmenu', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  fkorgid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  iseditable: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  level1menuitem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  level2menuitem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serialno: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  topmenuitem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uiroute: {
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
  tableName: 'webmenu', // Set the table name
  timestamps: false, // Disable timestamps
  // Additional configuration options can be added here
});

module.exports = Webmenu;
