const express = require("express");
const connectDB = require("./config/databse");
const app = express();
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")
const userRouter = require("./routes/user")
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cookieParser())
app.use(express.json());
const {userAuth} = require("../middlewares/auth");

const corsOptions = {
  origin: 'http://localhost:5173',    
  credentials: true                   
};
 const PORT = 7777;
app.use(cors(corsOptions));
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
connectDB()

  .then(() => {
    console.log("Database Connected Succesfully");
    app.listen(PORT, () => {
      console.log("server is listening on port"+PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
  
 
  



 

  


