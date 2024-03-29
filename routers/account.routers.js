const express = require("express");
const {Account, Customer} = require("../models")
const {login, uploadAvatar, logout, createAccountForCustomer, changePassword, forgotPassword, loginAdmin, verify, accessForgotPassword, updateProfile} = require("../controllers/account.controllers");
const { checkExistAccount } = require("../middlewares/validates/checkExist");
const { checkCreateAccount, checkPhone, checkEmail } = require("../middlewares/validates/checkCreate");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")

const accountRouter = express.Router();

accountRouter.post("/login", checkExistAccount(Account), login);
accountRouter.post("/admin/login", checkExistAccount(Account), loginAdmin);
accountRouter.get("/logout", authenticate, logout);
accountRouter.post("/avatar", authenticate, authorize(["Khách hàng"]), uploadAvatar);
accountRouter.put("/updateprofile", authenticate, authorize(["Khách hàng"]), updateProfile);
accountRouter.post("/create", checkCreateAccount(Account), checkEmail(Customer), checkPhone(Customer), createAccountForCustomer);
accountRouter.post("/forgotpassword", checkExistAccount(Account), forgotPassword);
accountRouter.post("/forgotpassword/verify", checkExistAccount(Account), verify);
accountRouter.post("/forgotpassword/verify/success", checkExistAccount(Account), accessForgotPassword);
accountRouter.put("/changepassword", authenticate, changePassword);

module.exports = {
    accountRouter,
}