var express = require('express');
var router = express.Router();
const Review = require('../models/Review');

router.get('/', (req, res) => {
  Review.find({ sellerId: req.query.sellerId }).then((reviews) => {
    res.json(reviews);
  });
});

module.exports = router;
