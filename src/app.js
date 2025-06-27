const express = require("express");
const connectDB = require("./config/databse");
const app = express();
const User = require("./models/user");
const user = require("./models/user");
const {validateSignupData} = require("./utils/Validation")
const bcrypt = require("bcrypt")
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
app.use(cookieParser())
app.use(express.json());
const {userAuth} = require("../middlewares/auth");


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
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
  
 
  



 

  


