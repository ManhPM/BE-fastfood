"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Wishlist.belongsToMany(models.Food, {
      //   through: models.Wishlist_detail,
      //   foreignKey: "id_food",
      // });
      Wishlist.belongsTo(models.Customer, {
        foreignKey: "id_customer",
      });
      Wishlist.hasMany(models.Wishlist_detail, {
        foreignKey: "id_wishlist",
      });
    }
  }
  Wishlist.init(
    {
      id_wishlist: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Wishlist",
      timestamps: false,
    }
  );
  return Wishlist;
};
