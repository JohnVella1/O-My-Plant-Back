const CoreModel = require('./coreModel');
const db = require('../database');

/**
 * An entity representing a plant
 * @typedef {Object} Plantdb
 * @property {number} id
 * @property {string} commonname
 * @property {string} photo
 * @property {string} description
 * @property {number} dateadded
 * @property {number} member_id
 */

class Plantdb extends CoreModel {

    /**
     * The plantdb constructor
     * @param {Object} obj a litteral object with properties copied into the instance
     */
    constructor(obj = {}) {
        super(obj);
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static tableName = 'plantdb';

    static async count() {
        try {

            const {
                rows
            } = await db.query(`select count(commonname) from plantdb;`);
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
            await db.query(`DELETE FROM plantdb WHERE id=$1`, [plant_id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
};

module.exports = Plantdb;