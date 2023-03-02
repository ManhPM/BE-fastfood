const express = require("express");
const {Account} = require("../models")
const {login, logout, createAccountForCustomer, changePassword, forgotPassword, loginAdmin} = require("../controllers/account.controllers");
const { checkExistAccount } = require("../middlewares/validates/checkExist");
const { checkCreateAccount } = require("../middlewares/validates/checkCreate");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const accountRouter = express.Router();

accountRouter.post("/login", checkExistAccount(Account), login);
accountRouter.post("/admin/login", checkExistAccount(Account), authorize(["Admin"]), loginAdmin);
accountRouter.get("/logout", authenticate, logout);
accountRouter.post("/create", checkCreateAccount(Account), createAccountForCustomer);
accountRouter.post("/forgotpassword", checkExistAccount(Account), forgotPassword);
accountRouter.put("/changepassword", authenticate, checkExistAccount(Account), changePassword);

module.exports = {
    accountRouter,
}