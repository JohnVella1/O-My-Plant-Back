const db = require('../database');
const CoreModel = require('./coreModel');

/**
 * An entity representing a plant of garden
 * @typedef {Object} Plantmember
 * @property {number} id
 * @property {string} nickname
 * @property {string} wateringfrequency
 * @property {number} numberoftimes
 * @property {string} repotting
 * @property {string} trimming
 * @property {string} exposure
 * @property {string} site
 * @property {string} photo_member
 * @property {number} garden_id
 * @property {number} plantdb_id
 */
class Plantmember extends CoreModel {

    /**
     * The Plantmember constructor
     * @param {Object} obj a litteral object with properties copied into the instance
     */
    constructor(obj = {}) {
        super(obj);
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static tableName = 'plantmember';

    /**
     * Find all plants by garden
     * @return {object} all plants in one garden
     * @throws {Error} a potential SQL error
     */

    static async findAllPlantByGarden(garden_id) {
        // Récupère toutes les plantes d'un jardin avec les infos de base de la table plantdb
        try {
            const {
                rows
            } = await db.query(`Select * from plantdb inner join plantmember
                                 on plantdb.id = plantmember.plantdb_id 
                                 WHERE garden_id = $1 ORDER BY commonname ASC;`, [garden_id]);

            return rows;
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Add a plant in plantgarden. The plant is a copy of plantdb.
     * It can be found in the member's garden. Unlike the plantdb,
     * the plantgarden, visible only in the member's garden,
     * can be modified by the owner of the garden.
     * @returns {Object} a new plantgarden
     * @throws {Error} a potential SQL error
     */

    static async findOne(plant_id) {
        // Récupère une plante d'un jardin avec les infos de base de la table plantdb
        try {
            const {
                rows
            } = await db.query(`Select * from plantdb inner join plantmember
                                on plantdb.id = plantmember.plantdb_id 
                                WHERE plantmember.id = $1;`, [plant_id]);
            return rows.map(row => new this(row));

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    };

    static async deletePlant (plant_id) {
        try {
            await db.query(`DELETE FROM plantmember WHERE id=$1`, [plant_id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
};

module.exports = Plantmember;