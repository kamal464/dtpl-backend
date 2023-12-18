const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Emphistory = sequelizeConnection.define('Emphistory', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  fkempid: { type: DataTypes.BIGINT, allowNull: false },
  latestfkempofficalid: { type: DataTypes.INTEGER, allowNull: false },
  latestfkempsalaryid: { type: DataTypes.INTEGER, allowNull: false },
  previousfkempofficalid: { type: DataTypes.INTEGER, allowNull: false },
  previousfkempsalaryid: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'emphistory',
  timestamps: false,
});

module.exports = Emphistory;
