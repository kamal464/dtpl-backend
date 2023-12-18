const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Emppersonal = sequelizeConnection.define('Emppersonal', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  dateofbirth: { type: DataTypes.BIGINT, allowNull: true },
  dateofmarriage: { type: DataTypes.BIGINT, allowNull: true },
  facebook: { type: DataTypes.STRING, allowNull: true },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  gender: { type: DataTypes.STRING, allowNull: true },
  homemobile: { type: DataTypes.STRING, allowNull: true },
  instagram: { type: DataTypes.STRING, allowNull: true },
  isactive: { type: DataTypes.INTEGER, allowNull: true },
  linkedin: { type: DataTypes.STRING, allowNull: true },
  personalemail: { type: DataTypes.STRING, allowNull: true },
  personalmobile: { type: DataTypes.STRING, allowNull: true },
  reviewdate: { type: DataTypes.INTEGER, allowNull: true },
  reviewedbyfkempid: { type: DataTypes.BIGINT, allowNull: true },
  twitter: { type: DataTypes.STRING, allowNull: true },
  website: { type: DataTypes.STRING, allowNull: true },
  workmobile: { type: DataTypes.STRING, allowNull: true },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'emppersonal',
  timestamps: false,
});

module.exports = Emppersonal;
