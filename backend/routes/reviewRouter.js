const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.get("/", reviewController.getAllReviews);
router.post("/", authController.protect, reviewController.createReview);
router.get("/:id", reviewController.getReview);
router.patch("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
