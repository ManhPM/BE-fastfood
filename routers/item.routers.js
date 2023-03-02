const express = require("express");
const {Item} = require("../models")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const {getAllItem, getDetailItem, createItem, updateItem, deleteItem} = require("../controllers/item.controllers");
const { checkCreateItem } = require("../middlewares/validates/checkCreate.js");
const itemRouter = express.Router();

itemRouter.get("/:page", getAllItem);
itemRouter.get("/", getAllItem);
itemRouter.get("/detail/:id_item", getDetailItem);
itemRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateItem(Item), createItem);
itemRouter.put("/update/:id_item", authenticate, authorize(["Admin"]), updateItem);
itemRouter.delete("/delete/:id_item", authenticate, authorize(["Admin"]), deleteItem);

module.exports = {
    itemRouter,
}