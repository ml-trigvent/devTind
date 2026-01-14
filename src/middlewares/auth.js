const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ✅ FIXED PATH

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies || {};

    if (!token) {
      return res.status(401).send("Token is not found");
    }

    const decoded = jwt.verify(token, "manu");

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).send("User is not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};

module.exports = {
  userAuth,
};
