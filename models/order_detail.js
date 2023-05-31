"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order_detail.belongsTo(models.Order, {
      //   foreignKey: "id_order",
      //   as: "order",
      // });
      Order_detail.belongsTo(models.Item, { foreignKey: "id_item" });
      Order_detail.belongsTo(models.Order, { foreignKey: "id_order" });
    }
  }
  Order_detail.init(
    {
      // id_order_detail: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      id_order: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Order", key: "id_order" },
      },
      id_item: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Item", key: "id_item" },
      },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      isReviewed: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Order_detail",
      timestamps: false,
      underscored: true,
    }
  );
  return Order_detail;
};
