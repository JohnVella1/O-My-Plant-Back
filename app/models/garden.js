const CoreModel = require('./coreModel');
const db = require('../database');

/**
 * An entity representing a garden
 * @typedef {Object} Garden
 * @property {number} id
 * @property {number} member_id
 */

class Garden extends CoreModel {

    /**
     * The Garden constructor
     * @param {Object} obj a litteral object with properties copied into the instance
     */

    constructor(obj = {}) {
        super(obj);
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static tableName = 'garden';

    /**
     * Find a garden by their owner
     * @returns {Object} a garden by its owner
     * @throws {Error} a potential SQL error
     */

    static async findOne(id) {
        try {
            const {
                rows
            } = await db.query(`Select * from garden WHERE member_id = $1`, [id]);
            if (rows[0]) {
                return new this(rows[0]);
            }
            return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
};

module.exports = Garden;