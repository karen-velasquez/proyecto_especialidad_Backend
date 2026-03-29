/**
 * controllers/user.controller.js
 *
 * Controlador de usuarios.
 * Maneja las peticiones HTTP relacionadas con el perfil del usuario.
 * Delega la lógica de negocio al servicio UserService.
 */

const userService = require('../services/user.service');

/**
 * Retorna el perfil del usuario autenticado.
 *
 * El objeto req.user es adjuntado por el middleware JWT "protect"
 * y ya contiene los datos del usuario sin el campo password.
 * No se necesita consultar la base de datos nuevamente.
 */
const getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Lista todos los usuarios registrados en el sistema.
 * Ruta pública, no requiere autenticación.
 */
const listUsers = async (req, res) => {
  try {
    const users = await userService.list();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Actualiza los datos del perfil del usuario autenticado.
 *
 * Campos actualizables: nombres, apellidos, fechaNacimiento, telefono, email.
 * No permite cambiar el carnet ni la contraseña desde este endpoint.
 * Retorna el usuario actualizado.
 */
const updateUser = async (req, res) => {
  try {
    const { nombres, apellidos, fechaNacimiento, telefono, email } = req.body;
    const updated = await userService.update(req.user._id, {
      nombres, apellidos, fechaNacimiento, telefono, email
    });
    res.json({ message: "Usuario actualizado correctamente", user: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMe, listUsers, updateUser };
