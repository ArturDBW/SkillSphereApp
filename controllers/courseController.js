const Course = require("../models/courseModel");

exports.getAllTours = async (req, res, next) => {
  const courses = await Course.find();

  try {
    res.status(200).json({
      status: "success",
      data: {
        courses,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
