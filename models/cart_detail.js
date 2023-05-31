"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_detail.belongsTo(models.Cart, { foreignKey: "id_cart" });
      Cart_detail.belongsTo(models.Item, { foreignKey: "id_item" });
    }
  }
  Cart_detail.init(
    {
      // id_cart_detail: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      id_cart: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Cart", key: "id_cart" },
      },
      id_item: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Item", key: "id_item" },
      },

      quantity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Cart_detail",
      timestamps: false,
      underscored: true,
    }
  );
  return Cart_detail;
};
