const express = require("express");
const buyController = require("../controllers/buyController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/course/:courseId/user/:userId",
  authController.protect,
  buyController.buyCourse
);

module.exports = router;
