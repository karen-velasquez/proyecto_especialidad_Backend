/**
 * services/dog.service.js
 *
 * Servicio de perros.
 * Contiene la lógica de negocio relacionada con las mascotas.
 * Actua como intermediario entre los controladores y el repositorio,
 * evitando que los controladores accedan directamente a la base de datos.
 */

const dogRepository = require('../repositories/dog.repository');

class DogService {
  /**
   * Registra un nuevo perro en la base de datos.
   *
   * @param {object} dogData - Datos del perro: nombre, genero, edadAnios, edadMeses,
   *                           raza, esterilizado, codigoEsterilizacion, owner, foto, razasDetectadas
   * @returns {Dog}          - Documento del perro creado
   */
  async register({ nombre, genero, edadAnios, edadMeses, raza, esterilizado, codigoEsterilizacion, owner, foto, razasDetectadas }) {
    return await dogRepository.create({
      nombre, genero, edadAnios, edadMeses, raza,
      esterilizado, codigoEsterilizacion,
      owner, foto, razasDetectadas
    });
  }

  /**
   * Lista todos los perros de la base de datos sin filtrar por propietario.
   * Se usa internamente; los controladores usan listByOwner.
   *
   * @returns {Dog[]} - Arreglo de todos los perros
   */
  async list() {
    return await dogRepository.findAll();
  }

  /**
   * Busca un perro por su ID.
   *
   * @param {string} id - ID del documento en MongoDB
   * @returns {Dog|null} - Perro encontrado o null si no existe
   */
  async findById(id) {
    return await dogRepository.findById(id);
  }

  /**
   * Lista todos los perros registrados por un propietario específico.
   *
   * @param {string} ownerId - ID del usuario propietario
   * @returns {Dog[]}        - Arreglo de perros del propietario
   */
  async listByOwner(ownerId) {
    return await dogRepository.findByOwner(ownerId);
  }

  /**
   * Busca perros cuya raza detectada por el modelo ML supere un umbral de confianza.
   *
   * @param {string} raza         - Nombre de la raza a buscar
   * @param {number} minConfianza - Umbral mínimo de confianza entre 0 y 1 (por defecto 0.6)
   * @returns {Dog[]}             - Perros que coinciden con el criterio de búsqueda
   */
  async searchByBreed(raza, minConfianza = 0.6) {
    return await dogRepository.findByBreedWithMinConfidence(raza, minConfianza);
  }
}

module.exports = new DogService();
