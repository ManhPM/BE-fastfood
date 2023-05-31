"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Staff.belongsTo(models.Account, {
        foreignKey: "id_account",
        as: "account",
      });
    }
  }
  Staff.init(
    {
      id_staff: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: { type: DataTypes.DATE, allowNull: false },
      email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Staff",
      timestamps: false,
      underscored: true,
    }
  );
  return Staff;
};
