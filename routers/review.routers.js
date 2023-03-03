const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate.js");
const reviewRouter = express.Router();
const {
  getAllReviewByItem,
  createReviewByItem,
  get4LastestReviewsByItem,
} = require("../controllers/review.controllers");

reviewRouter.get("/:id_item", getAllReviewByItem); //*
reviewRouter.get("/detail/:id_item", get4LastestReviewsByItem); //*
reviewRouter.post("/:id_item", authenticate, createReviewByItem); //*

module.exports = {
  reviewRouter,
};
