/**
 * server.js
 *
 * Punto de entrada de la aplicación.
 * Carga las variables de entorno, establece la conexión a la base de datos
 * e inicia el servidor HTTP en el puerto configurado.
 */

require("dotenv").config();
const app = require("./app");
const connectDB = require("./db");

// Conectar a MongoDB antes de levantar el servidor
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
