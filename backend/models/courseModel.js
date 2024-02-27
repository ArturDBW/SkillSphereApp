const mongoose = require("mongoose");
const slugify = require("slugify");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Please provie a author"],
    },
    imageCover: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    // reviews: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Review",
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
courseSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "course",
  localField: "_id",
});

// Slug generation
courseSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
