const router = require('express').Router();
const {wrapAsync} = require('../util/util');
const userController = require('../controllers/userController');
const {getUserId} = userController;

router.route('/user/userId')
    .get(wrapAsync(getUserId));

// router.route('/room/:roomId')
//     .get(wrapAsync(getRoom));

module.exports = router;