const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user Added successfully");
  } catch (err) {
    
    res.status(400).send("Something went wrong:" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(400).send("email not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
     await User.findByIdAndDelete(userId);
    res.send("user deleted susefyully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});


app.patch("/user", async(req, res)=>{
  const userId = req.body.userId;
  console.log(userId)
  const data = req.body;
  try{
     await User.findByIdAndUpdate({ _id : userId }, data,{
      runValidators:true,
     });
     res.send("user update successfully")
  }catch (err){
    res.status(400).send("update failed:" + err.message);

  }
})

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
