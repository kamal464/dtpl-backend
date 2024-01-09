const { DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../lib/mqsqlLib");

const Holidays = sequelizeConnection.define(
  "Holidays",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    fkorgid: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fkofficeid: { type: DataTypes.BIGINT, allowNull: false },
    date: { type: DataTypes.INTEGER, allowNull: true },
    year: { type: DataTypes.INTEGER, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    optionalholiday: { type: DataTypes.INTEGER, allowNull: false },
    holidaydescription: { type: DataTypes.TEXT, allowNull: false },
    sid: { type: DataTypes.INTEGER, allowNull: false },
    rss: { type: DataTypes.INTEGER, allowNull: false },
    lct: { type: DataTypes.INTEGER, allowNull: false },
    lmt: { type: DataTypes.INTEGER, allowNull: false },
    sct: { type: DataTypes.INTEGER, allowNull: false },
    smt: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "holidays",
    timestamps: false,
  }
);

// Synchronize the model with the database
sequelizeConnection
  .sync()
  .then(() => {
    console.log("Holidays model synced with database");
  })
  .catch((err) => {
    console.error("Error syncing Holidays model with database:", err);
  });

module.exports = Holidays;
