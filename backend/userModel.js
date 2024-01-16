const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.createUser = function (userData) {
  return new User({
    isAdmin: userData.isAdmin || false,
    name: userData.name,
    age: userData.age,
    emailId: userData.emailId,
    password: userData.password
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
