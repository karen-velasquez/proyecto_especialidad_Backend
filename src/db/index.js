const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/dogsdb");
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  }
};

module.exports = connectDB;