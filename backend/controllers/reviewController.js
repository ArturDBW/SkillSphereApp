const Review = require("./../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllReviews = async (req, res, next) => {
  let filter = {};
  if (req.params.courseId) filter = { course: req.params.courseId };
  try {
    const reviews = await Review.find(filter);

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.course) req.body.course = req.params.courseId;
  if (!req.body.user) req.body.user = req.user.id;

  try {
    const newReview = await Review.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    if (
      err.code === 11000 &&
      err.keyPattern &&
      err.keyPattern.course &&
      err.keyPattern.user
    ) {
      return next(new AppError("You have already reviewed this course", 400));
    }
    return next(err);
  }
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  if (!req.body.course) req.body.course = req.params.courseId;

  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return res.status(404).json({
      status: "fail",
      message: "Review not found",
    });
  }

  await Review.calcAverageRatings(review.course);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
