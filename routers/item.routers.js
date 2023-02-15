const express = require("express");
const {getAllItem, getDetailItem} = require("../controllers/item.controllers");
const itemRouter = express.Router();

itemRouter.get("/", getAllItem);
itemRouter.get("/detail/:id_item", getDetailItem);

module.exports = {
    itemRouter,
}