const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const LoggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: LoggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    res.json({
      message: "Data fetch Successfully",
      data: connectionRequest,
    });
  } catch (err) {
    req.status(400).send("ERROR  " + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", {})

    const data = connectionRequest.map((row) => row.fromUserId);
    res.json({
        
        data
    })
  } catch (err) {
    res.status(404).send("ERROR  :" + err.message);
  }
});

module.exports = userRouter;
