// lib/mongoose.ts
import mongoose from "mongoose";

const mongouri = process.env.MONGODB_URI!;

if (!mongouri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(mongouri, {
      dbName: "pricetrackr",
    });
    isConnected = true;
    console.log("✅ MongoDB connected with Mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
