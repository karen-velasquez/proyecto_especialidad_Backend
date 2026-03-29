/**
 * services/auth.service.js
 *
 * Servicio de autenticación.
 * Contiene la lógica de negocio para el inicio de sesión.
 *
 * Responsabilidades:
 *   - Verificar que el usuario exista buscando por carnet
 *   - Comparar la contraseña ingresada con el hash almacenado usando bcrypt
 *   - Generar y retornar un token JWT con el id y carnet del usuario
 *
 * El token tiene una validez de 1 día ("1d").
 * La clave secreta se lee del archivo .env (JWT_SECRET).
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');

class AuthService {
  /**
   * Autentica a un usuario por carnet y contraseña.
   *
   * @param {string} carnet    - Carnet de identidad del usuario
   * @param {string} password  - Contraseña en texto plano ingresada por el usuario
   * @returns {string}         - Token JWT firmado
   * @throws {Error}           - Si el usuario no existe o la contraseña es incorrecta
   */
  async login({ carnet, password }) {
    // Buscar usuario incluyendo el campo password (excluido por defecto en el modelo)
    const user = await userService.findByCarnet(carnet);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña ingresada con el hash almacenado en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar token JWT con el id y carnet del usuario como payload
    const token = jwt.sign(
      { id: user._id, carnet: user.carnet },
      process.env.JWT_SECRET || 'secreto_desarrollo',
      { expiresIn: '1d' }
    );

    return token;
  }
}

module.exports = new AuthService();
