const Course = require("../models/courseModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");

exports.getAllCourse = async (req, res, next) => {
  try {
    // filtering

    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //  advanced filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Course.find(JSON.parse(queryStr)).populate("reviews");

    // sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    // field limiting - średnio użyteczne

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination - nieużywane, zaimplementowano na froncie

    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numCourse = await Course.countDocuments();
      if (skip >= numCourse) throw new Error("This page does not exist");
    }

    //

    const courses = await query;

    res.status(200).json({
      status: "success",
      results: courses.length,
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

exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate(
    "reviews"
  );

  if (!course) {
    return next(new AppError("No tour found with that ID", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.createCourse = async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  try {
    const newCourse = await Course.create({
      ...req.body,
      imageCover: req.file.filename,
    });
    res.status(201).json({
      status: "success",
      data: {
        course: newCourse,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid Coruse ID" });
    }

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course)
      return res.status(404).json({
        status: "fail",
        message: "Course with this ID not exist",
      });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// image upload

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCoursePhoto = upload.single("imageCover");

exports.resizeCoursePhoto = (req, res, next) => {
  console.log(req.file);
  if (!req.file) return next();

  req.file.filename = `course-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(600, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/courses/${req.file.filename}`);

  next();
};
