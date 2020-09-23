const Review = require('../models/Review');

var ReviewController = {
  create: (req, res) => {
    var newReview = new Review({
      sellerId: req.query.sellerId,
      reviewValue: req.body.reviewValue,
      comment: req.body.comment,
    });

    newReview
      .save()
      .then(() =>
        res
          .status(200)
          .json({ message: 'Review successfully added to database' })
      )
      .catch(() =>
        res
          .status(400)
          .json({ error: 'Review could not be added to database.' })
      );
  },
};

module.exports = ReviewController;
