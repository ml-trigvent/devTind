const express = require("express");

const app = express();

app.use("/admin", (req, res, next) => {
    console.log("admin auth is checking")
  const token = "xyg11";
  const isAuthorized = token == "xyg";
  console.log(isAuthorized)
  if (!isAuthorized) {
    res.status(404).send("admin not found");
  } else {
    next();
  }
});

app.get("/admin/getallData", (req, res) => {
  res.send("admin data");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("delete a user data data");
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});
