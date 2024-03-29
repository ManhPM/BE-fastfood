"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // define association here
      Account.belongsTo(models.Role, { foreignKey: "id_role" });
      Account.hasOne(models.Customer, {
        foreignKey: "id_account",
        as: "customer",
      });
      Account.hasOne(models.Staff, { foreignKey: "id_account" });
    }
  }
  Account.init(
    {
      id_account: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
      forgot: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Account",
      timestamps: false,
      underscored: true,
    }
  );
  return Account;
};
