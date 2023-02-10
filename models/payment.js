'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.hasMany(models.Order, {
        foreignKey: "id_payment",
      });
      // define association here
    }
  }
  Payment.init({
    id_payment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
    timestamps: false,
  });
  return Payment;
};