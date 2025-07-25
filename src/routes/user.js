const express = require("express");
const { userAuth } = require("../../middlewares/auth");
const userRouter = express.Router();
const connectionRequests = require("../models/connectionRequests");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName age gender about skills photoUrl"


userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  const loggedInUserId = req.user._id;
  console.log(req.user);
  console.log(loggedInUserId);

  try {
    const pendingRequests = await connectionRequests.find({
      toUserId: loggedInUserId,
      status: "intrested",
    }).populate("fromUserId",["firstName","lastName"]);

    if (!pendingRequests) {
      res.json({
        message: "No Pending Requests for user : " + req?.user.firstName,
      });
    }
    
    res.json({
      message: "Requests Found for User " + req?.user.firstName,
      data: pendingRequests,
    });
  } catch (error) {
    res.status(404).send("Error ", error.message);
  }
});

 userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
   
     
    const connection = await connectionRequests.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("toUserId", USER_SAFE_DATA)
      .populate("fromUserId", USER_SAFE_DATA);

        console.log(connection)
 
    const data = connection.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


 userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await connectionRequests.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
