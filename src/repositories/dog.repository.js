/**
 * repositories/dog.repository.js
 *
 * Repositorio de perros.
 * Abstrae el acceso directo a la base de datos MongoDB para el modelo Dog.
 * Centraliza todas las consultas relacionadas con perros para mantener
 * la lógica de acceso a datos separada de la lógica de negocio.
 */

const Dog = require('../models/dog.model');

class DogRepository {
  /**
   * Crea y guarda un nuevo perro en la base de datos.
   * Si el perro no está esterilizado, se fuerza el código de esterilización a null
   * para evitar que se guarden datos inconsistentes.
   *
   * @param {object} dogData - Datos del perro a crear
   * @returns {Dog}          - Documento del perro guardado
   */
  async create(dogData) {
    // Si no está esterilizado, el código de esterilización no debe guardarse
    if (!dogData.esterilizado) {
      dogData.codigoEsterilizacion = null;
    }
    const dog = new Dog(dogData);
    return await dog.save();
  }

  /**
   * Retorna todos los perros de la base de datos con los datos del propietario.
   * Usa populate para reemplazar el ObjectId de owner con el documento User completo.
   *
   * @returns {Dog[]} - Arreglo de todos los perros con datos del owner
   */
  async findAll() {
    return await Dog.find().populate('owner');
  }

  /**
   * Busca un perro por su ID e incluye los datos del propietario.
   *
   * @param {string} id  - ID del documento en MongoDB
   * @returns {Dog|null} - Perro encontrado con datos del owner, o null
   */
  async findById(id) {
    return await Dog.findById(id).populate('owner');
  }

  /**
   * Lista todos los perros registrados por un propietario específico.
   *
   * @param {string} ownerId - ID del usuario propietario
   * @returns {Dog[]}        - Arreglo de perros que pertenecen al propietario
   */
  async findByOwner(ownerId) {
    return await Dog.find({ owner: ownerId }).populate('owner');
  }

  /**
   * Busca perros cuya lista de razas detectadas por el modelo ML contenga
   * la raza indicada con un nivel de confianza mayor o igual al mínimo.
   *
   * Usa el operador $elemMatch de MongoDB para buscar dentro del arreglo
   * "razasDetectadas" por los campos "raza" y "confianza" simultáneamente.
   *
   * Solo retorna los campos necesarios del propietario (nombres, apellidos,
   * carnet, telefono, email) para no exponer datos sensibles.
   *
   * @param {string} raza         - Nombre de la raza a buscar
   * @param {number} minConfianza - Umbral mínimo de confianza (entre 0 y 1)
   * @returns {Dog[]}             - Perros que coinciden con la raza y confianza indicadas
   */
  async findByBreedWithMinConfidence(raza, minConfianza = 0.6) {
    return await Dog.find({
      razasDetectadas: {
        $elemMatch: { raza: raza, confianza: { $gte: minConfianza } }
      }
    }).populate('owner', 'nombres apellidos carnet telefono email');
  }
}

module.exports = new DogRepository();
