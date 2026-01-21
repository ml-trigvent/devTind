const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://ongcvidesh.com/company/board-of-directors/dummy-image/",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url  address:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "this is a default ",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

userSchema.index({firstName : 1, })
userSchema.methods.getJWT = async function() {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "manu", {
    expiresIn: "1d",
  });
  return token
}

module.exports = mongoose.model("User", userSchema);
