const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if ((!firstName || !lastName)) {
    throw new Error("name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("FirstName should be 4-50 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a strong password");
  }
};

module.exports = {
  validateSignUpData,
};
