require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./userModel");
const jwt = require("jsonwebtoken");
const cors = require("cors")

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const connectToDB = async () => {
  try{
    await mongoose.connect(process.env.MONGOURL)
    console.log('connected to DB')
  }
  catch(e){
    console.log(e);
  }
}

app.use(bodyParser.json());

connectToDB();

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = User.createUser(req.body);

    if (
      !newUser.name ||
      !newUser.age ||
      !newUser.emailId ||
      !newUser.password
    ) {
      return res
        .status(400)
        .json({ error: "Name, age, emailId and password are required fields" });
    }

    const savedUser = await User.create({
      name: newUser.name,
      age: newUser.age,
      emailId: newUser.emailId,
      password: newUser.password,
    });

    res.json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isAdmin = req.body.isAdmin;
    user.name = req.body.name;
    user.age = req.body.age;
    user.emailId = req.body.emailId;

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    console.log("Error saving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.deleteOne();

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/authenticate", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      console.log("asdqwfvaf");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY, {
      expiresIn: "1h",
    });

    res.json({ token: token });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
      console.log("Server up and running");
  });
}

module.exports = app;