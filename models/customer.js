"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.Account, {
        foreignKey: "id_account",
      });

      Customer.hasMany(models.Order, {
        foreignKey: "id_customer",
      });

      // Customer.belongsToMany(models.Food, {
      //   through: models.Review,
      //   foreignKey: "id_food",
      // });
      Customer.hasMany(models.Order, {
        foreignKey: "id_customer",
      });
      Customer.hasOne(models.Wishlist, {
        foreignKey: "id_customer",
      });
    }
  }
  Customer.init(
    {
      id_customer: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        }
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10,10]
        }
      },
      address: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Customer",
      timestamps: false,
      underscored: true,
    }
  );
  return Customer;
};
