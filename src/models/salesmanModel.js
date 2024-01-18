const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Salesman = sequelizeConnection.define('salesman', {
  salesid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: { type: DataTypes.STRING, allowNull: true },
  City: { type: DataTypes.STRING, allowNull: true },
  Commission: { type: DataTypes.FLOAT, allowNull: true },
}, {
  tableName: 'salesman',
  timestamps: false,
});

module.exports = Salesman;
