const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = "mongodb+srv://saifianash7:7mrjsHLc6wEMP6jZ@cluster0.9clfouw.mongodb.net/Tinder?retryWrites=true&w=majority";

  try {
    await mongoose.connect(uri
      
    );

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
