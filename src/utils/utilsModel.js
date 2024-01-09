const { DataTypes } = require('sequelize');
const { sequelizeConnection } = require("../lib/mqsqlLib"); // Adjust the path accordingly

const Country = sequelizeConnection.define('Country', {
  id: { type: DataTypes.STRING, primaryKey: true, field: 'code' },
  value: { type: DataTypes.STRING, field: 'name' },
}, { timestamps: false, tableName: 'country' });

const ReasonItem = sequelizeConnection.define('ReasonItem', {
  id: { type: DataTypes.STRING, primaryKey: true, field: 'code' },
  value: { type: DataTypes.STRING, field: 'value' },
}, { timestamps: false, tableName: 'reasonitem' });

const Office = sequelizeConnection.define('Office', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  value: { type: DataTypes.STRING, field: 'concat(code,":",name)' },
}, { timestamps: false, tableName: 'office' });

const Department = sequelizeConnection.define('Department', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  value: { type: DataTypes.STRING, field: 'name' },
}, { timestamps: false, tableName: 'department' });

const Employee = sequelizeConnection.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  value: { type: DataTypes.STRING, field: 'concat(empcode,":",displayname)' },
}, { timestamps: false, tableName: 'emp' });


sequelizeConnection.sync()
  .then(() => {
    console.log('utils model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing utils model with database:', err);
  });
module.exports = { Country, ReasonItem, Office, Department, Employee };
