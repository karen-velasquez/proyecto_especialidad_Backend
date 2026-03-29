/**
 * repositories/user.repository.js
 *
 * Repositorio de usuarios.
 * Abstrae el acceso directo a la base de datos MongoDB para el modelo User.
 * Los servicios llaman a este repositorio en lugar de usar el modelo directamente,
 * lo que facilita cambiar la fuente de datos sin afectar la lógica de negocio.
 */

const User = require('../models/user.model');

class UserRepository {
  /**
   * Crea y guarda un nuevo usuario en la base de datos.
   * Si el email no se provee, se elimina del objeto antes de guardar
   * para que el índice sparse de MongoDB funcione correctamente
   * (permite múltiples documentos sin el campo email).
   *
   * @param {object} userData - Datos del usuario a crear
   * @returns {User}          - Documento del usuario guardado
   */
  async create(userData) {
    // Si email es vacío o undefined, eliminarlo para respetar el índice sparse
    if (!userData.email) {
      delete userData.email;
    }
    const user = new User(userData);
    return await user.save();
  }

  /**
   * Busca un usuario por su carnet de identidad.
   * Incluye explicitamente el campo password (excluido por defecto en el modelo)
   * para permitir la comparación de contraseñas durante el login.
   *
   * @param {string} carnet - Carnet de identidad del usuario
   * @returns {User|null}   - Usuario encontrado con password incluido, o null
   */
  async findByCarnet(carnet) {
    return await User.findOne({ carnet }).select('+password');
  }

  /**
   * Retorna todos los usuarios de la base de datos.
   *
   * @returns {User[]} - Arreglo de usuarios (sin campo password)
   */
  async findAll() {
    return await User.find();
  }

  /**
   * Actualiza los datos de un usuario por su ID.
   * Si el email no se provee en la actualización, se elimina del objeto
   * para no sobreescribir un email existente con un valor vacío.
   *
   * Opciones:
   *   new: true           -> retorna el documento ya actualizado
   *   runValidators: true -> aplica las validaciones del esquema al actualizar
   *
   * @param {string} id   - ID del usuario a actualizar
   * @param {object} data - Campos a actualizar
   * @returns {User}      - Documento del usuario actualizado
   */
  async updateById(id, data) {
    if (!data.email) {
      delete data.email;
    }
    return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }
}

module.exports = new UserRepository();
