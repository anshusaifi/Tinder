const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require('../../middlewares/auth');
const connectionRequests = require("../models/connectionRequests");
const User = require("../models/user");
 

requestRouter.post("/request/send/:status/:touserId",userAuth ,async(req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId   = req.params.touserId;
        const status  = req.params.status;
        console.log(toUserId);

        const Allowed_Status = ["intrested","ignored"];
        if(!Allowed_Status.includes(status)){
           res.json({
            message : "Invalid Requests"
           })
        }
         
        const connectionRequest = new connectionRequests({
            fromUserId,
            toUserId,
            status
        })
  
        const existingConnectionRequest = await connectionRequests.findOne({
            $or : [
                { fromUserId,toUserId},
                {fromUserId:toUserId , toUserId : fromUserId},
            ]
        })

        if(existingConnectionRequest){
              return res.status(400).send("Conneciton request already exists")
        }

        const data = await connectionRequest.save();
        const toUser = await User.findById(toUserId);
        const fromUser = await User.findById(fromUserId);

        res.json({
             message : fromUser.firstName +" is sending a  "+status+" request to "+toUser.firstName,
             data : data
        }
        )

    } catch (error) {
        res.status(400).send("Error aa rha h: "+ error.message)
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user;
  const { status , requestId} = req.params;

  const Allowed_Status = ["accepted", "rejected"];
        if(!Allowed_Status.includes(status)){
           res.json({
            message : "Invalid Requests"
           })
        } 

    const connectionRequest = await connectionRequests.findOne({
        _id : requestId,
        toUserId : loggedInUser._id,
        status : "intrested"
    });

    if(!connectionRequest){
        res.status(404).json({
            message : "No requests has been found"
        })
    }

   
    connectionRequest.status = status;
    
    const data = await connectionRequest.save();
    res.json(
        {
            data : data,
            message : "Request Accepted Succesfully..."
        }
    )
    

    } catch (error) {
        res.status(400).send("Error: error catch Block" , error.message)
    }
  

})


module.exports = requestRouter;