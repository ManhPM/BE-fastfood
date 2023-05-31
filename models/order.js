"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, {
        foreignKey: "id_customer",
      });

      Order.hasMany(models.Order_detail, {
        foreignKey: "id_order",
      });
      
      Order.belongsTo(models.Payment, { foreignKey: "id_payment" });
    }
  }
  Order.init(
    {
      id_order: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      total: {
        type: DataTypes.INTEGER,
      },
      datetime: { type: DataTypes.DATE, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: false,
      underscored: true,
    }
  );
  return Order;
};
