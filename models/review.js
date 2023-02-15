"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Customer, { foreignKey: "id_customer" });
      Review.belongsTo(models.Item, { foreignKey: "id_item" });
    }
  }
  Review.init(
    {
      // id_review: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      id_customer: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Customer",
          key: "id_customer",
        },
      },
      id_item: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Item",
          key: "id_item",
        },
      },
      rating: { type: DataTypes.INTEGER, allowNull: false },
      comment: DataTypes.STRING,
      datetime: { 
        primaryKey: true,
        type: DataTypes.DATE,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Review",
      timestamps: false,
    }
  );
  return Review;
};
