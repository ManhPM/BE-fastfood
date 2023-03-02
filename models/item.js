"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasOne(models.Cart_detail, {
        foreignKey: "id_item",
      });

      Item.hasOne(models.Review, {
        foreignKey: "id_item",
      });

      Item.hasOne(models.Order_detail, {
        foreignKey: "id_item",
      });

      Item.hasOne(models.Wishlist_detail, {
        foreignKey: "id_item",
      });

      Item.belongsTo(models.Type, {
        foreignKey: "id_type",
      });
    }
  }
  Item.init(
    {
      id_item: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/3-1.png",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: DataTypes.STRING,
      energy: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      ingredient: DataTypes.STRING,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Item",
      timestamps: false,
    }
  );
  return Item;
};
