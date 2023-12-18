const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require('../lib/mqsqlLib');

const Empofficial = sequelizeConnection.define('Empofficial', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  approvalstatus: { type: DataTypes.INTEGER, allowNull: true },
  designation: { type: DataTypes.STRING, allowNull: true },
  effectivedate: { type: DataTypes.INTEGER, allowNull: true },
  enddate: { type: DataTypes.INTEGER, allowNull: true },
  fkdepartmentid: { type: DataTypes.BIGINT, allowNull: true },
  fkempid: { type: DataTypes.BIGINT, allowNull: true },
  fkofficeid: { type: DataTypes.BIGINT, allowNull: true },
  grade: { type: DataTypes.STRING, allowNull: true },
  isactive: { type: DataTypes.INTEGER, allowNull: true },
  managerfkempid: { type: DataTypes.BIGINT, allowNull: true },
  officeemail: { type: DataTypes.STRING, allowNull: true },
  previousfkempofficialid: { type: DataTypes.BIGINT, allowNull: true },
  remarks: { type: DataTypes.STRING, allowNull: true },
  reviewdate: { type: DataTypes.INTEGER, allowNull: true },
  reviewedbyfkempid: { type: DataTypes.BIGINT, allowNull: true },
  supervisorfkempid: { type: DataTypes.BIGINT, allowNull: true },
  type: { type: DataTypes.STRING, allowNull: true },

  sid: { type: DataTypes.INTEGER, allowNull: false },
  rss: { type: DataTypes.INTEGER, allowNull: false },
  lct: { type: DataTypes.INTEGER, allowNull: false },
  lmt: { type: DataTypes.INTEGER, allowNull: false },
  sct: { type: DataTypes.INTEGER, allowNull: false },
  smt: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'empofficial',
  timestamps: false,
});

module.exports = Empofficial;
