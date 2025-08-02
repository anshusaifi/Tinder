const express = require("express");
const connectDB = require("./config/databse");
const app = express();
const http = require('http')
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")
const userRouter = require("./routes/user")
const cookieParser = require("cookie-parser");
const cors = require('cors');
const initializeSocket = require("./utils/socket");
app.use(cookieParser())
app.use(express.json());
// const useLocation = require("react-router-dom")

// location.hostname === "localhost" ? "http://localhost:7777" : "/api";


const PORT =7777;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)


const server = http.createServer(app);
initializeSocket(server);

connectDB()

  .then(() => {
    console.log("Database Connected Succesfully");
    server.listen(PORT, () => {
      console.log("server is listening on port "+ PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
  
 
  



 

  


