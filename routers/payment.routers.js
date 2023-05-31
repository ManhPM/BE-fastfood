const express = require("express");
const { getAllPaymentMethods } = require("../controllers/payment.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const paymentRouter = express.Router();

paymentRouter.get("/", getAllPaymentMethods);

module.exports = {
    paymentRouter,
}