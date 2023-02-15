const express = require("express");
const { itemRouter } = require("./item.routers");
const { accountRouter } = require("./account.routers");
const { cartRouter } = require("./cart.routers");
const { orderRouter } = require("./order.routers");
const { wishlistRouter } = require("./wishlist.routers");
const { typeRouter } = require("./type.routers");
const { paymentRouter } = require("./payment.routers");
const rootRouter = express.Router();

rootRouter.use("/items", itemRouter);
rootRouter.use("/account", accountRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/wishlist", wishlistRouter);
rootRouter.use("/types", typeRouter);
rootRouter.use("/payment_methods", paymentRouter);

module.exports = {
    rootRouter,
}