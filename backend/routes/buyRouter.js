const express = require("express");
const buyController = require("../controllers/buyController");

const router = express.Router();

router.post("/", buyController.buyCourse);

module.exports = router;
