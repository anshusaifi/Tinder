const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const {userAuth} = require("../../middlewares/auth");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/Validation");



authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      throw new Error(" Invalid Credentials");
    }

    const isPassword = await user.validatePassword(password);
    if (isPassword) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("error" + error.message);
  }
});

authRouter.get("/me", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(401).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

authRouter.post("/Signup", async (req, res) => {
  try {
    validateSignupData(req);
    console.log(req.body);
    const {
      firstName,
      lastName,
      email,
      password,
      about,
      gender,
      skills,
      photoUrl,
      age,
    } = req.body;

    if (
      await User.findOne({
        email: req.body.email,
      })
    ) {
      res.json({
        message: "Email already Exists",
      });
    }

    
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      about,
      gender,
      skills,
      photoUrl,
      age,
    });

    await user.save();
    res.json({
      message : "user saved Succesfully",
      data : user
    })
  } catch (error) {
    res.status(400).send("error" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null),
    {
      expires: new Date(Date.now()),
    };
  res.send("User logout");
});

module.exports = authRouter;
