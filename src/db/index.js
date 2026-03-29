/**
 * db/index.js
 *
 * Módulo de conexión a MongoDB mediante Mongoose.
 * Se conecta a la base de datos local "dogsdb".
 * Esta función es llamada una sola vez al iniciar el servidor.
 */

const mongoose = require("mongoose");

/**
 * Establece la conexión con la base de datos MongoDB.
 * Si la conexión falla, muestra el error en consola pero no detiene el proceso.
 */
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/dogsdb");
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error de conexion a MongoDB:", error);
  }
};

module.exports = connectDB;
