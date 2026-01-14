const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

// login Api

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    const ispassword = await bcrypt.compare(password, user.password);

    if (ispassword) {
      const token = await jwt.sign({ _id: user._id }, "manu", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      res.send("login Successful");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/sentConnectionRequest", userAuth, (req, res) => {
  const  user = req.user;
  console.log("sending connection request")
  res.send(user.firstName + "request send" )
});



connectDB()
  .then(() => {
    console.log(" Database connection established");
    app.listen(3000, () => {
      console.log("server running on 3000 port");
    });
  })
  .catch((err) => {
    console.log("Database is not established");
  });
