const {  DataTypes } = require('sequelize');
const {sequelizeConnection} = require('../lib/mqsqlLib'); 

const Country = sequelizeConnection.define('Country', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  code: { type: DataTypes.STRING, allowNull: false },
  currencycode: { type: DataTypes.STRING, allowNull: true },
  currencysymbol: { type: DataTypes.STRING, allowNull: true },
  isdcode: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'country',
  timestamps: false,
});

// Synchronize the model with the database
sequelizeConnection.sync()
  .then(() => {
    console.log('Country model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing Country model with database:', err);
  });

module.exports = Country;
