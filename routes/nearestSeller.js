var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  const clientLatitude = req.query.latitude;
  const clientLongitude = req.query.longitude;

  User.find({ typeOfUser: 'seller' }).then((users) => {
    res.json(
      users
        .filter((seller) => {
          return (
            distance(
              seller.latitude,
              seller.longitude,
              clientLatitude,
              clientLongitude
            ) < req.query.maxDistance
          );
        })
        .sort((a, b) => {
          return (
            distance(a.latitude, a.longitude, clientLatitude, clientLongitude) -
            distance(b.latitude, b.longitude, clientLatitude, clientLongitude)
          );
        })[0]
    );
  });
});

function distance(lat1, lon1, lat2, lon2) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}

module.exports = router;
