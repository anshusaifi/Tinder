const jwt = require("jsonwebtoken")
const User = require("../src/models/user")

const userAuth = async(req,res,next)=>{
    // READ THR TOKEN FROM THE COOKIES
    //VALIDATE THE TOKEN
    //FIND THE USER
    try {
    const {token} = req.cookies;
  if(!token){
    throw new Error("Token not found")
  }
    const decodeMsg = await jwt.verify(token , "DEVTINDER@7099");
    const {_id} = decodeMsg;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("user not found")
    }
    req.user = user;
    next();

    } catch (error) {
        res.status(404).send("error :" + error.message);
    }
   

    
};

module.exports = {
    userAuth
}