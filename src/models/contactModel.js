const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Contact = sequelizeConnection.define('contact', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fkcustid: { type: DataTypes.BIGINT, allowNull: true },
  contactname: { type: DataTypes.STRING, allowNull: true },
  companyname: { type: DataTypes.STRING, allowNull: true },
  designation: { type: DataTypes.STRING, allowNull: true },
  addresstype: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  city: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'contact',
  timestamps: false,
});

module.exports = Contact;
