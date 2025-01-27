const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:  String,
  password:  String,
  email: String,
  role: {
    type: String,
    enum: ["Admin","Teacher","Student"], 
    default: "Student", 
  }
});

let User = mongoose.model("User", userSchema);

module.exports = User;