const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate.js");
const reviewRouter = express.Router();
const {
  getAllReviewByItem,
  createReviewByItem,
} = require("../controllers/review.controllers");

reviewRouter.get("/:id_item", getAllReviewByItem); //*
reviewRouter.post("/:id_item", authenticate, createReviewByItem); //*
module.exports = {
  reviewRouter,
};
