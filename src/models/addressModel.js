const {  DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');


const address = sequelizeConnection.define('address', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  area: { type: DataTypes.STRING, allowNull: true },
  building: { type: DataTypes.STRING, allowNull: true },
  city: { type: DataTypes.STRING, allowNull: true },
  contactname: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  fax: { type: DataTypes.STRING, allowNull: true },
  fkcountrycode: { type: DataTypes.STRING, allowNull: false },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  fkofficeid: { type: DataTypes.BIGINT, allowNull: true },
  fkorgid: { type: DataTypes.BIGINT, allowNull: true },
  houseno: { type: DataTypes.STRING, allowNull: true },
  isactive: { type: DataTypes.INTEGER, allowNull: false },
  landmark: { type: DataTypes.STRING, allowNull: true },
  latitude: { type: DataTypes.STRING, allowNull: true },
  locality: { type: DataTypes.STRING, allowNull: true },
  longitude: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  postalcode: { type: DataTypes.STRING, allowNull: true },
  region: { type: DataTypes.STRING, allowNull: true },
  street: { type: DataTypes.STRING, allowNull: true },
  type: { type: DataTypes.STRING, allowNull: true },
  zone: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'address',
  timestamps: false,
  
});

module.exports = address;
