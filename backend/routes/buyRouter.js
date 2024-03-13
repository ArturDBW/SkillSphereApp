const express = require("express");
const buyController = require("../controllers/buyController");

const router = express.Router();

router.post("/course/:courseId/user/:userId", buyController.buyCourse);

module.exports = router;
