/**
 * controllers/auth.controller.js
 *
 * Controlador de autenticación.
 * Maneja las peticiones HTTP de registro e inicio de sesión.
 * Delega la lógica de negocio a los servicios correspondientes.
 */

const userService = require("../services/user.service");
const authService = require("../services/auth.service");

/**
 * Registra un nuevo usuario en el sistema.
 *
 * Recibe del body: nombres, apellidos, carnet, fechaNacimiento, telefono, email, password
 * Responde con un mensaje de confirmación o un error descriptivo.
 *
 * Manejo especial del error 11000 (clave duplicada de MongoDB):
 *   - Si el campo duplicado es "carnet", informa que el carnet ya está registrado.
 *   - Si el campo duplicado es "email", informa que el correo ya está registrado.
 */
const register = async (req, res) => {
  try {
    const { nombres, apellidos, carnet, fechaNacimiento, telefono, email, password } = req.body;
    await userService.register({ nombres, apellidos, carnet, fechaNacimiento, telefono, email, password });
    res.json({
      message: "Usuario registrado correctamente"
    });
  } catch (error) {
    // Error de clave única duplicada en MongoDB
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      if (field === 'carnet') {
        return res.status(400).json({ error: 'El carnet de identidad ya está registrado' });
      }
      if (field === 'email') {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      }
      return res.status(400).json({ error: 'Ya existe un usuario con esos datos' });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Autentica a un usuario con su carnet y contraseña.
 *
 * Recibe del body: carnet, password
 * Responde con el token JWT si las credenciales son correctas,
 * o con un error 400 si son incorrectas.
 */
const login = async (req, res) => {
  try {
    const { carnet, password } = req.body;
    const token = await authService.login({ carnet, password });
    res.json({
      message: "Login exitoso",
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};
