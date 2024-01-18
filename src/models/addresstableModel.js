const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const AddressTable = sequelizeConnection.define('addresstable', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkorgid: { type: DataTypes.BIGINT, allowNull: true },
  fkofficeid: { type: DataTypes.BIGINT, allowNull: true },
  type: { type: DataTypes.STRING, allowNull: true },
  line1: { type: DataTypes.STRING, allowNull: true },
  line2: { type: DataTypes.STRING, allowNull: true },
  line3: { type: DataTypes.STRING, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  city: { type: DataTypes.STRING, allowNull: true },
  district: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  pincode: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'addresstable',
  timestamps: false,
});

module.exports = AddressTable;
