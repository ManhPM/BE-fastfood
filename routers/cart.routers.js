const express = require("express");
const {Cart} = require("../models")
const {getAllItemInCart, createItemInCart, order, deleteOneItemInCart, increaseNumItemInCart, decreaseNumItemInCart, updateItemInCart } = require("../controllers/cart.controllers");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const cartRouter = express.Router();

cartRouter.get("/", authenticate, authorize(["Khách hàng"]), getAllItemInCart);
cartRouter.post("/add/:id_item", authenticate, authorize(["Khách hàng"]), createItemInCart);
cartRouter.post("/update/:id_item", authenticate, authorize(["Khách hàng"]), updateItemInCart);
cartRouter.post("/checkout", authenticate, authorize(["Khách hàng"]), order);
cartRouter.delete("/remove/:id_item", authenticate, authorize(["Khách hàng"]), deleteOneItemInCart);
cartRouter.post("/decrease/:id_item", authenticate, authorize(["Khách hàng"]), decreaseNumItemInCart);
cartRouter.post("/increase/:id_item", authenticate, authorize(["Khách hàng"]), increaseNumItemInCart);


module.exports = {
    cartRouter,
}