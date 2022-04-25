const router = require('express').Router();
const {wrapAsync} = require('../util/util');
const roomController = require('../controllers/roomController');
const {createRoom} = roomController;

router.route('/room/')
    .post(wrapAsync(createRoom));


module.exports = router;