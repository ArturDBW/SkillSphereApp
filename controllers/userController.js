const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  try {
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      // Jeżeli nie znaleziono użytkownika, wyślij odpowiedź z kodem błędu 404
      return res.status(404).json({
        status: "fail",
        message: "Valid User ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
