const Course = require("../models/courseModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.buyCourse = catchAsync(async (req, res, next) => {
  try {
    // Pobierz identyfikatory kursu i użytkownika z ciała żądania
    const { courseId, userId } = req.body;

    // Upewnij się, że oba identyfikatory zostały przekazane
    if (!courseId || !userId) {
      return res.status(400).json({
        status: "fail",
        message: "Both courseId and userId must be provided",
      });
    }

    // Sprawdź, czy kurs istnieje
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    // Sprawdź, czy użytkownik istnieje
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    // Sprawdź czy użytkownik posiada już kurs
    if (
      user.boughtCourses.find((course) => course._id.toString() === courseId)
    ) {
      return res.status(400).json({
        status: "fail",
        message: "User already bought this course",
      });
    }
    // Dodaj kurs do listy kupionych kursów użytkownika
    user.boughtCourses.push(courseId);
    await user.save();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
