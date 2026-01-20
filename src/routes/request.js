const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sentConnectionRequest", userAuth, (req, res) => {
    const  user = req.user;
    console.log("sending connection request")
    res.send(user.firstName + "request send" )
  });
  

module.exports = requestRouter;