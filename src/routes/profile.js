const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../../middlewares/auth")
const { isUserFieldValid} = require("../utils/Validation")
profileRouter.get("/profile/view", userAuth,async (req,res)=>{
    try {
     const user = req.user;
       res.send(user);
       
    } catch (error) {
      res.send("ERROR User Not Found ")
    }
       
  })

  profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
         try {

          if(!isUserFieldValid(req)){
          throw new Error("User Fields Can not be Edited");
           
         }
         const loggedInUser = req.user;
         Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]));
         await loggedInUser.save();
         res.json({
          message : `${loggedInUser.firstName} , Your Profile Updated Succesfully`,
          data : loggedInUser})

         } catch (error) {
          res.status(400).send("Error "+ error.message);
         }
         
  })

  module.exports = profileRouter;