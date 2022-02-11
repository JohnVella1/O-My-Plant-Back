const db = require('../database');

/**
 * The CoreModel
 * @param {Object} obj a factory to make the basic CRUD
 */
class CoreModel {

    /**
     * Find all objects to the database
     * @returns {Object} the objects found
     * @throws {Error} a potential SQL error
     */

    static async findAll() {
        try {
            const {
                rows
            } = await db.query(`SELECT * FROM ${this.tableName}`);
            return rows.map(row => new this(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Add one object to the database
     * @returns {Object} the object found
     * @throws {Error} a potential SQL error
     */

    static async findOne(id) {
        try {
            const {
                rows
            } = await db.query(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);
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

    /**
     * Add or update an object to the database
     * @returns {Object} the created or updated object
     * @throws {Error} a potential SQL error
     */

    async save() {
        try {
            if (this.id) {
                //update
                await db.query(`SELECT * FROM update_${this.constructor.tableName}($1)`, [this]);
            } else {
                //create
                const {
                    rows
                } = await db.query(`SELECT * FROM add_${this.constructor.tableName}($1)`, [this])
                this.id = rows[0].id;
                return this;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Delete an object to the database
     * @throws {Error} a potential SQL error
     */

    async delete() {
        try {
            await db.query(`DELETE FROM ${this.constructor.tableName} WHERE id=$1`, [this.id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = CoreModel;