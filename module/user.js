const mongoose = require("mongoose");   

mongoose.connect("mongodb://127.0.0.1:27017/testtapp1");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    imageurl: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User ; 