const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref :"User" // refrence to the user collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "intrested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save", function (next){
  const connectionRequest = this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot Send Request to YourSelf")
  }
  next();
})

module.exports = mongoose.model("ConnectionRequests", connectionRequestSchema);
