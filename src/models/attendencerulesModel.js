const { DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../lib/mqsqlLib");

const Attendencerules = sequelizeConnection.define(
  "Attendencerules",
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
    weekend1: { type: DataTypes.STRING, allowNull: true },
    weekend2: { type: DataTypes.STRING, allowNull: true },
    weekendtype1: { type: DataTypes.STRING, allowNull: false },
    weekendtype2: { type: DataTypes.STRING, allowNull: false },
    daystart: { type: DataTypes.INTEGER, allowNull: false },
    dayend: { type: DataTypes.INTEGER, allowNull: false },
    entrytime: { type: DataTypes.INTEGER, allowNull: false },
    exittime: { type: DataTypes.INTEGER, allowNull: false },
    lateconcessiondays: { type: DataTypes.INTEGER, allowNull: false },
    paidleaveperlate: { type: DataTypes.DECIMAL, allowNull: false },
    sid: { type: DataTypes.INTEGER, allowNull: false },
    rss: { type: DataTypes.INTEGER, allowNull: false },
    lct: { type: DataTypes.INTEGER, allowNull: false },
    lmt: { type: DataTypes.INTEGER, allowNull: false },
    sct: { type: DataTypes.INTEGER, allowNull: false },
    smt: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "attendencerules",
    timestamps: false,
  }
);

// Synchronize the model with the database
sequelizeConnection
  .sync()
  .then(() => {
    console.log("Attendencerules model synced with database");
  })
  .catch((err) => {
    console.error("Error syncing Attendencerules model with database:", err);
  });

module.exports = Attendencerules;
