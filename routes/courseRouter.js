const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.get("/", courseController.getAllTours);
router.get("/:id", courseController.getCourse);

module.exports = router;
