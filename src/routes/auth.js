const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/Validation");

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPassword = await user.validatePassword(password);
    if (isPassword) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("user login succesfully");
    }
  } catch (error) {
    res.status(400).send("error" + error.message);
  }
});



authRouter.post("/Signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();
    res.send("user saved Succefully");
  } catch (error) {
    res.status(400).send("error" + error.message);
  }
});

module.exports = authRouter;
