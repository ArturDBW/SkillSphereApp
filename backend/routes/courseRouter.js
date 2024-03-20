const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const reviewRouter = require("../routes/reviewRouter");

const router = express.Router();

router.get("/", courseController.getAllCourse);
router.get("/:id", courseController.getCourse);
router.post("/", authController.protect, courseController.createCourse);
router.patch("/:id", authController.protect, courseController.updateCourse);
router.delete("/:id", authController.protect, courseController.deleteCourse);

// router
//   .route("/:courseId/reviews")
//   .post(authController.protect, reviewController.createReview);
// zamiast tego linijka niżej + mergeParams:true na reviewRouter

router.use("/:courseId/reviews", reviewRouter);

module.exports = router;
