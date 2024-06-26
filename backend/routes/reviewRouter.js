const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.get("/", reviewController.getAllReviews);
router.post("/", authController.protect, reviewController.createReview);
router.get("/:id", reviewController.getReview);
router.patch("/:id", authController.protect, reviewController.updateReview);
router.delete("/:id", authController.protect, reviewController.deleteReview);

module.exports = router;
