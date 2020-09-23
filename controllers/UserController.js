const bcrypt = require('bcryptjs');

const User = require('../models/User');

var UserController = {
  signup: (req, res) => {
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          typeOfUser: req.body.typeOfUser,
          profession: req.body.profession,
          longitude: req.body.longitude,
          latitude: req.body.latitude,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },

  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).json({ usernotfound: 'Email not found' });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          res.json(user);
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: 'Password incorrect' });
        }
      });
    });
  },

  getAllSellers: (req, res) => {
    User.find({ typeOfUser: 'seller' }).then((users) => {
      res.json(users);
    });
  },
};

module.exports = UserController;
