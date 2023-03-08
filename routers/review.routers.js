const express = require("express");
const {Order} = require("../models")
const { authenticate } = require("../middlewares/auth/authenticate.js");
const reviewRouter = express.Router();
const {
  getAllReviewByItem,
  createReviewByItem,
  get4LastestReviewsByItem,
} = require("../controllers/review.controllers");
const { checkCreateReview } = require("../middlewares/validates/checkCreate.js");

reviewRouter.get("/:id_item", getAllReviewByItem); //*
reviewRouter.get("/detail/get4", get4LastestReviewsByItem); //*
reviewRouter.post("/:id_item", checkCreateReview(Order), authenticate, createReviewByItem); //*

module.exports = {
  reviewRouter,
};
