const express = require("express");
const { userAuth, validateEditProfileData } = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid  Edit Request ");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    loggedInUser.save();
    console.log(loggedInUser)

    res.json({message:`${loggedInUser.firstName}, your profile updated successfully`,
    data:loggedInUser});
  } catch (err) {
    res.status(400).send("Error  : " + err.message);
  }
});

module.exports = profileRouter;
