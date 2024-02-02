const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.get("/", courseController.getAllTours);
router.get("/:id", courseController.getCourse);
router.post("/", courseController.createCourse);

module.exports = router;
