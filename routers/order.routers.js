const express = require("express");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { getAllItemInOrder, getAllOrder, confirmOrder, cancelOrder, thongKeSanPham, thongKeDonHang } = require("../controllers/order.controllers");
const orderRouter = express.Router();

orderRouter.get("/", authenticate, authorize(["Khách hàng","Admin"]), getAllOrder);
orderRouter.get("/detail/:id_order", authenticate, authorize(["Khách hàng","Admin"]), getAllItemInOrder);
orderRouter.get("/confirm/:id_order", authenticate, authorize(["Admin"]), confirmOrder);
orderRouter.get("/cancel/:id_order", authenticate, authorize(["Admin","Khách hàng"]), cancelOrder);
orderRouter.get("/thongke", authenticate, authorize(["Admin"]), thongKeSanPham);
orderRouter.get("/thongkedonhang", authenticate, authorize(["Admin"]), thongKeDonHang);


module.exports = {
    orderRouter,
}