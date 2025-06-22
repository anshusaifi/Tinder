const express = require("express");
 const connectDB = require("./config/databse");
const app = express();
const User = require("./models/user");


connectDB()
  .then(() => {
    console.log("Database Connected Succesfully");
    app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
  })
  .catch((err) => {
    console.log(err);
  });

  app.post("/Signup",async (req,res)=>{
    const user  = User({
        firstName : "Anas",
        lastName  : "ali",
        email : "abc@gmail.com",
        password : "123456",

    })

    try {
        
        await user.save();
    res.send("user saved Succefully");

    } catch (error) {
          res.status(400).send("error"+error);
    }

    await user.save();
    res.send("user saved Succefully");

  })


