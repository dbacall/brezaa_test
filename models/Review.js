const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  sellerId: {
    type: String,
    required: true,
  },
  reviewValue: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
});

var Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
