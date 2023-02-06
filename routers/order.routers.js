const express = require("express");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { getAllItemInOrder, getAllOrder, confirmOrder, deleteOrder } = require("../controllers/order.controllers");
const orderRouter = express.Router();

orderRouter.get("/", authenticate, authorize(["Khách hàng","Nhân viên"]), getAllOrder);
orderRouter.get("/:id_order", authenticate, authorize(["Khách hàng","Nhân viên"]), getAllItemInOrder);
orderRouter.post("/:id_order", authenticate, authorize(["Khách hàng","Nhân viên"]), confirmOrder);
orderRouter.delete("/:id_order", authenticate, authorize(["Khách hàng","Nhân viên"]), deleteOrder);


module.exports = {
    orderRouter,
}