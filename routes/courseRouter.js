const express = require("express");
const courseController = require("../controllers/courseController");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", courseController.getAllTours);
router.get("/:id", courseController.getCourse);
router.post("/", courseController.createCourse);
router.patch("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

router
  .route("/:courseId/reviews")
  .post(authController.protect, reviewController.createReview);

module.exports = router;
