const express = require("express");
const { model } = require("mongoose");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    //  Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("error :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    const ispassword = await bcrypt.compare(password, user.password);

    if (ispassword) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login Successful");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
res.cookie("token", null,{
  expires: new Date(Date.now()),
});
res.send("logout Successfully");
})

module.exports = authRouter;
