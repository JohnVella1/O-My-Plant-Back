const CoreModel = require('./coreModel');
const bcrypt = require('bcrypt');
const Garden = require('./garden');
const db = require('../database');

/**
 * An entity representing a member
 * @typedef {Object} Member
 * @property {number} id
 * @property {string} pseudo
 * @property {string} firstname
 * @property {string} lastname
 * @property {number} dateofbirth
 * @property {string} telephone
 * @property {string} mail
 * @property {string} password
 * @property {string} profilepicture
 * @property {string} biography
 * @property {number} counter
 * @property {string} level
 * @property {string} role
 */

class Member extends CoreModel {

    /**
     * The Member constructor
     * @param {Object} obj a litteral object with properties copied into the instance
     */

    constructor(obj = {}) {
        super(obj);
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static tableName = 'member';

    /**
     * Add a member to the database
     * @returns {Member} the newly created member and its associated garden.
     * @throws {Error} a potential SQL error
     */

    async memberSave() {
        try {
            const password = await bcrypt.hash(this.password, 10);
            const {
                rows
            } = await db.query(`INSERT INTO "member"(pseudo, mail, password) VALUES($1, $2, $3) RETURNING id`, [this.pseudo, this.mail, password]);
            this.id = rows[0].id;
            const linkGarden = await db.query(`INSERT INTO garden (member_id) VALUES ($1)`, [this.id]);
            return this;
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Connect a member to the website
     * @throws {Error} a potential SQL error
     */


    /*
        Login du membre.
    */
    async doLogin() {
        try {
            const {
                rows
            } = await db.query(`SELECT * FROM "member" WHERE mail =$1`, [this.mail]);
            if (!rows[0]) {
                throw new Error('Identification failed');
            }

            const isPwdValid = await bcrypt.compare(this.password, rows[0].password);

            if (!isPwdValid) {
                throw new Error('Identification failed');
            }

            this.id = rows[0].id;
            this.pseudo = rows[0].pseudo;
            this.firstname = rows[0].firstname;
            this.lastname = rows[0].lastname;
            this.pseudo = rows[0].pseudo;
            this.mail = rows[0].mail;
            this.profilepicture = rows[0].profilepicture;
            this.dateofbirth = rows[0].dateofbirth;
            this.level = rows[0].level;
            this.biography = rows[0].biography;
            this.telephone = rows[0].telephone;
            this.role = rows[0].role;

            return this;
        } catch (error) {
            console.log(error)
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error
        }
    };

    /**
     * Delete a member, its garden and its plantmembers
     * @throws {Error} a potential SQL error
     */

    static async deleteMember(id) {
        /*
            Suppression d'un compte utilisateur:
                - Recupère le jardin associé à l'id du membre.
                - Supprime toute les plantes de son jardin.
                - Supprime son jardin.
                - Retire l'id du membre dans les plantes qu'il a ajouté de la table plantdb.
                - Supprime définitivement le membre.
        */
        try {
            const { rows } = await db.query(`SELECT * FROM garden WHERE member_id=$1`, [id]);
            console.log(rows)

            await db.query(`DELETE FROM plantmember WHERE garden_id=$1`, [rows[0].id]);
            await db.query(`DELETE FROM garden WHERE id=$1`, [rows[0].id]);
            await db.query(`UPDATE plantdb SET member_id = null WHERE member_id =$1`, [id]);
            await db.query(`DELETE FROM member WHERE id=$1`, [id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
};

module.exports = Member;