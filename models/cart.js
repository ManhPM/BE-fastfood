"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cart.belongsToMany(models.Food, {
      //   through: models.Cart_detail,
      //   foreignKey: "id_food",
      // });
      Cart.hasMany(models.Cart_detail, {
        foreignKey: "id_cart",
      });

      Cart.belongsTo(models.Customer, {
        foreignKey: "id_customer",
      });
    }
  }
  Cart.init(
    {
      id_cart: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      timestamps: false,
    }
  );
  return Cart;
};
