var express = require('express');
var router = express.Router();
var ReviewController = require('../controllers/ReviewController');

router.post('/', ReviewController.create);

module.exports = router;
