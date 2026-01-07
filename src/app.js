const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Manu",
    lastName: "Thakur",
    email: "manu@trigvent.com",
    password: "Manohar@123",
  });
  try {
    await user.save();
    res.send("user Added successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
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
