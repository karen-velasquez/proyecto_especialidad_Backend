/**
 * services/user.service.js
 *
 * Servicio de usuarios.
 * Contiene la lógica de negocio relacionada con el registro,
 * consulta y actualización de usuarios.
 * Actua como intermediario entre los controladores y el repositorio.
 */

const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');

class UserService {
  /**
   * Registra un nuevo usuario en el sistema.
   * La contraseña se hashea con bcrypt usando un salt de 10 rondas
   * antes de almacenarse en la base de datos.
   *
   * @param {object} userData - Datos del usuario: nombres, apellidos, carnet,
   *                            fechaNacimiento, telefono, email, password
   * @returns {User}          - Documento del usuario creado
   */
  async register({ nombres, apellidos, carnet, fechaNacimiento, telefono, email, password }) {
    // Hashear la contraseña antes de guardarla (nunca se guarda en texto plano)
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository.create({
      nombres,
      apellidos,
      carnet,
      fechaNacimiento,
      telefono,
      email,
      password: hashedPassword
    });
  }

  /**
   * Busca un usuario por su número de carnet de identidad.
   * Incluye el campo password en el resultado para permitir la verificación
   * de credenciales durante el login (este campo está excluido por defecto).
   *
   * @param {string} carnet - Carnet de identidad del usuario
   * @returns {User|null}   - Usuario encontrado o null si no existe
   */
  async findByCarnet(carnet) {
    return await userRepository.findByCarnet(carnet);
  }

  /**
   * Retorna todos los usuarios registrados en el sistema.
   *
   * @returns {User[]} - Arreglo de usuarios
   */
  async list() {
    return await userRepository.findAll();
  }

  /**
   * Actualiza los datos del perfil de un usuario.
   * No permite cambiar el carnet ni la contraseña.
   *
   * @param {string} id       - ID del usuario a actualizar
   * @param {object} data     - Campos a actualizar: nombres, apellidos, fechaNacimiento, telefono, email
   * @returns {User}          - Documento del usuario actualizado
   */
  async update(id, { nombres, apellidos, fechaNacimiento, telefono, email }) {
    return await userRepository.updateById(id, {
      nombres, apellidos, fechaNacimiento, telefono, email
    });
  }
}

module.exports = new UserService();
