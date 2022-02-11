const memberController = require('./controllers/memberController');
const gardenController = require('./controllers/gardenController');
const plantmemberController = require('./controllers/plantmemberController');
const plantdbController = require('./controllers/plantdbController');
const jwtMW = require('./middlewares/jwtMW');
const memberSchema = require('./schema/memberSchema');

const {
    validateBody
} = require('./middlewares/validator');

const memberBody = validateBody(memberSchema);

const {
    Router
} = require('express');

const router = Router();

/**
 * POST /login
 * @summary login to member
 * @route POST /login
 * @tags member
 * @returns {array<Member>} 200 - An array of login
 */
router.post('/login', memberController.login);

/**
 * GET /member/connected
 * @summary login to member
 * @route GET /member/connected
 * @tags member
 * @returns {array<Member>} 200 - An array to verify the token of the member
 */
router.get('/member/connected', memberController.verifyToken);

/**
 * POST /subscribe
 * @summary create a member
 * @route POST /subscribe
 * @tags member
 * @returns {array<Member>} 200 - An array to create one member
 */
router.post('/subscribe', memberController.subscribe);

/**
 * GET /infos
 * @summary get a token to connexion
 * @route GET /infos
 * @tags member
 * @returns {array<Member>} 200 - An array of infos
 */
router.get('/infos', jwtMW, memberController.getInfos);

/**
 * GET /member
 * @summary get all members
 * @route GET /member
 * @tags member
 * @returns {array<Member>} 200 - An array to get all members
 */
router.get('member', jwtMW, memberController.findAll);

/**
 * GET /member/:id(\\d+)
 * @summary get a member by id
 * @route GET /member/:id(\\d+)
 * @tags member
 * @returns {array<Member>} 200 - An array to get one member
 */
router.get('/member/:id(\\d+)', jwtMW, memberController.findOne);

/**
 * PATCH /member
 * @summary update a member
 * @route PATCH /member/
 * @tags member
 * @returns {array<Member>} 200 - An array to update one member
 */
router.patch('/member/', jwtMW, memberBody, memberController.save);

/**
 * DELETE /member/:id(\\d+)
 * @summary delete a member by id
 * @route DELETE /member/:id(\\d+)
 * @tags member
 * @returns {array<Member>} 200 - An array to delete one member
 */
router.delete('/member/', jwtMW, memberController.delete);

/**
 * GET /memberGarden
 * @summary get a garden by member id
 * @route GET /memberGarden
 * @tags member
 * @returns {array<Garden>} 200 - An array to get a garden by the id of the member
 */
router.get('/memberGarden', jwtMW, gardenController.findOne)

/**
 * GET /garden
 * @summary get all plantmembers associate to one garden
 * @route GET /garden
 * @tags plantmember
 * @returns {array<Plantmember>} 200 - An array to get all plantmembers associate to one garden
 */
router.get('/garden', jwtMW, plantmemberController.findAllPlantByGarden);

/**
 * GET /garden/:id(\\d+)
 * @summary get one plantmember associate to one garden
 * @route GET /garden/:id(\\d+)
 * @tags plantmember
 * @returns {array<Plantmember>} 200 - An array to get one plantmember associate to one garden
 */
router.get('/garden/:id(\\d+)', jwtMW, plantmemberController.findOne);

/**
 * PATCH /garden/:id(\\d+)
 * @summary update one plantmember in one garden
 * @route PATCH /garden/:id(\\d+)
 * @tags plantmember
 * @returns {array<Plantmember>} 200 - An array to update one plantmember associate to one garden
 */
router.patch('/garden/:id(\\d+)', jwtMW, plantmemberController.save);

/**
 * POST /garden
 * @summary create one plantmember in one garden
 * @route POST /garden
 * @tags plantmember
 * @returns {array<Plantmember>} 200 - An array to create one plantmember associate to one garden
 */
router.post('/garden', jwtMW, plantmemberController.save);

/**
 * DELETE /garden/:id(\\d+)
 * @summary delete one plantmember in one garden
 * @route DELETE /garden/:id(\\d+)
 * @tags plantmember
 * @returns {array<Plantmember>} 200 - An array to delete one plantmember associate to one garden
 */
router.delete('/garden/:id(\\d+)', jwtMW, plantmemberController.delete);

/**
 * GET /plantdb
 * @summary get all plantdbs
 * @route GET /plantdb
 * @tags plantdb
 * @returns {array<Plantdb>} 200 - An array to get all plantdbs
 */
router.get('/plantdb', jwtMW, plantdbController.findAll);

/**
 * GET /plantdb/:id(\\d+)
 * @summary get one plant
 * @route GET /plantdb/:id(\\d+)
 * @tags plantdb
 * @returns {array<Plantdb>} 200 - An array to get one plantdb
 */
router.get('/plantdb/:id(\\d+)', jwtMW, plantdbController.findOne);

/**
 * POST /plantdb
 * @summary create a plant
 * @route POST /plantdb/:id(\\
 * @tags plantdb
 * @returns {array<Plantdb>} 200 - An array to create one plantdb
 */
router.post('/plantdb', jwtMW, plantdbController.save);

/**
 * GET /plantdbCount
 * @summary get the number of all plants in database
 * @route POST /plantdb/:id(\\
 * @tags plantdb
 * @returns {array<Plantdb>} 200 - An array to get the number of all plants in database
 */
router.get('/plantdbCount', plantdbController.count)

/**
 * DELETE /plantdb/:id(\\d+)
 * @summary delete a plant
 * @route DELETE /plantdb/:id(\\d+)
 * @tags plantdb
 * @returns {array<Plantdb>} 200 - An array to delete one plantdb
 */
router.delete('/plantdb/:id(\\d+)', jwtMW, plantdbController.delete);

module.exports = router;