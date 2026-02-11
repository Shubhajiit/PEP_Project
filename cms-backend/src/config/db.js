const mongoose = require("mongoose");

const connectDB = async()=>{
    const uri = process.env.MONGO_URI || process.env.MONGO_URL;
    if (!uri) {
      console.warn("MONGO_URI not set; skipping MongoDB connection");
      return;
    }

    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log("MongoDB Connected");
    } catch (err) {
      console.error("MongoDB connection error:", err?.message || err);
    }

}
module.exports = connectDB;
