require("dotenv").config();

const dns = require("dns");
const mongoose = require("mongoose");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function testConnection() {
  try {
    console.log("Connecting to MongoDB...");
    console.log("Using Google DNS...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected Successfully!");

    await mongoose.disconnect();
    console.log("MongoDB Disconnected.");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
  }
}

testConnection();