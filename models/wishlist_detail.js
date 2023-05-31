"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist_detail.belongsTo(models.Wishlist, { foreignKey: "id_wishlist" });
      Wishlist_detail.belongsTo(models.Item, { foreignKey: "id_item" });
    }
  }
  Wishlist_detail.init(
    {
      // id_wishlist_detail: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      id_item: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Item", key: "id_item" },
      },
      id_wishlist: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Wishlist", key: "id_wishlist" },
      },
    },
    {
      sequelize,
      modelName: "Wishlist_detail",
      timestamps: false,
      underscored: true,
    }
  );
  return Wishlist_detail;
};
