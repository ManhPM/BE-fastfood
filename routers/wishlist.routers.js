const express = require("express");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { getAllItemInWishList, updateItemInWishList } = require("../controllers/wishlist.controllers.js");
const wishlistRouter = express.Router();

wishlistRouter.get("/", authenticate, authorize(["Khách hàng"]), getAllItemInWishList);
wishlistRouter.post("/:id_item", authenticate, authorize(["Khách hàng"]), updateItemInWishList);

module.exports = {
    wishlistRouter,
}