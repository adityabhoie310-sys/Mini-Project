const mongoose = require("mongoose");
const dns = require("dns");

// Use Google DNS for MongoDB Atlas SRV connection
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri || uri.includes("YOUR_ENCODED_PASSWORD")) {
    console.log("ℹ️ MongoDB URI contains placeholder credentials. Running server with database memory fallback.");
    return;
  }

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}. Running in memory fallback mode.`);
  }
};

module.exports = connectDB;