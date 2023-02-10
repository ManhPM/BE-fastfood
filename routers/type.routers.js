const express = require("express");
const { getAllType } = require("../controllers/type.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const typeRouter = express.Router();

typeRouter.get("/", getAllType);

module.exports = {
    typeRouter,
}