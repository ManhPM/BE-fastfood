const express = require("express");
const { itemRouter } = require("./item.routers");
const { accountRouter } = require("./account.routers");
const { cartRouter } = require("./cart.routers");
const { orderRouter } = require("./order.routers");
const { wishlistRouter } = require("./wishlist.routers");
const { typeRouter } = require("./type.routers");
const rootRouter = express.Router();

rootRouter.use("/item", itemRouter);
rootRouter.use("/account", accountRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/order", orderRouter);
rootRouter.use("/wishlist", wishlistRouter);
rootRouter.use("/type", typeRouter);

module.exports = {
    rootRouter,
}