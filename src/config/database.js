const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://manohar_db_user:j3pQultpvkWdLppZ@cluster0.mrrcucw.mongodb.net/devTinder");
};
module.exports =connectDB;
