const express = require("express");
const {Account} = require("../models")
const {login, logout, createAccountForCustomer, updateAccount, deleteAccount} = require("../controllers/account.controllers");
const { checkExistAccount, checkLogin } = require("../middlewares/validates/checkExist");
const { checkCreateAccount } = require("../middlewares/validates/checkCreate");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const accountRouter = express.Router();

accountRouter.post("/login", checkLogin(Account), login);
accountRouter.get("/logout", authenticate, logout);
accountRouter.post("/create", checkCreateAccount(Account), createAccountForCustomer);
accountRouter.put("/changepassword", authenticate, checkExistAccount(Account), updateAccount);

// khoRouter.get("/new", authenticate, authorize(["Nhân viên","Quản lý"]), create);
// khoRouter.get("/", authenticate, authorize(["Nhân viên","Quản lý"]), getAllKho);
// khoRouter.get("/:maKho/edit", authenticate, authorize(["Nhân viên","Quản lý"]), edit);
// khoRouter.get("/:maKho", authenticate, authorize(["Nhân viên","Quản lý"]), getDetailKho);
// khoRouter.post("/create", authenticate, authorize(["Nhân viên","Quản lý"]), checkCreateKho(Kho), createKho);
// khoRouter.put("/:maKho", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistKho(Kho), updateType);
// khoRouter.delete("/:maKho", authenticate, authorize(["Nhân viên","Quản lý"]), checkExistKho(Kho), deleteKho);
module.exports = {
    accountRouter,
}