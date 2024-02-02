const moongose = require("moongose");

const courseSchema = new moongose.Schema({
  title: {
    type: String,
    require: [true, "Please provide a title"],
  },
  author: {
    type: String,
    require: [true, "Please provie a author"],
  },
  imageCover: {
    type: String,
  },
  price: {
    type: Number,
    require: [true, "Please provide a price"],
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Course = moongose.model("Course", courseSchema);
module.exports = Course;
