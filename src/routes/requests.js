const express = require("express");
const requestRouter = express.Router();

requestRouter.get("/user",async(requestRouter,res)=>{
    res.send("this is requestRouter")
})

module.exports = requestRouter;