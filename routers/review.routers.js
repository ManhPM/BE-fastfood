const express = require("express");
const {Order} = require("../models")
const {uploadReview} = require("../middlewares/multer/uploadMiddleware");
const { authenticate } = require("../middlewares/auth/authenticate.js");
const reviewRouter = express.Router();
const {
  getAllReviewByItem,
  createReviewByItem,
  get4LastestReviewsByItem,
  notification,
} = require("../controllers/review.controllers");
const { checkCreateReview } = require("../middlewares/validates/checkCreate.js");

reviewRouter.get("/:id_item", getAllReviewByItem); //*
reviewRouter.get("/detail/get", get4LastestReviewsByItem); //*
reviewRouter.post("/:id_item", authenticate, checkCreateReview(Order), uploadReview.single('image'), notification); //*

module.exports = {
  reviewRouter,
};
