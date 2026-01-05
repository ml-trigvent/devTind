const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth")

app.use("/admin", adminAuth)
app.use("/user", userAuth)


app.get("/admin/getallData", (req, res) => {
  res.send("admin data");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("delete a user data data");
});

app.get("/user", (req, res) => {
  res.send("this is my user");
});


app.listen(3000, () => {
  console.log("server running on 3000 port");
});
