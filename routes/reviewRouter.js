const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.get("/", reviewController.getAllReviews);

module.exports = router;
