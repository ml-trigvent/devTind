const express = require("express");
const connectDB =require("./config/database")

const app = express();


connectDB().then(() => {
  console.log(" Database connection established")
  app.listen(3000, () => {
    console.log("server running on 3000 port");
  });
  
}).catch((err)=> {
  console.log("Database is not established")
});

