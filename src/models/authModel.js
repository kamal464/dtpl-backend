const {  DataTypes } = require('sequelize');
const {sequelizeConnection} = require('../lib/mqsqlLib'); 

const Auth = sequelizeConnection.define('Auth', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  authstatus: { type: DataTypes.INTEGER, allowNull: true },
  authtoken: { type: DataTypes.STRING, allowNull: true },
  authuri: { type: DataTypes.STRING, allowNull: true },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'auth',
  timestamps: false,
});



module.exports = Auth;
