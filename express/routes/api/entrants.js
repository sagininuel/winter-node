const express = require('express');
const router = express.Router();
const entrantsController = require('../../controllers/entrantsController');
// const verifyJWT = require('../../middleware/verifyJWT')

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

// router.route('/')
//     .get(verifyJWT, entrantsController.getAllentrants)
//     .post(entrantsController.createNewentrant)
//     .put(entrantsController.updateentrant)
//     .delete(entrantsController.deleteentrant);


router.route('/')
    .get(entrantsController.getAllentrants)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), entrantsController.createNewentrant)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), entrantsController.updateentrant)
    .delete(verifyRoles(ROLES_LIST.Admin), entrantsController.deleteentrant);

router.route('/:id')
    .get(entrantsController.getentrant);

module.exports = router;