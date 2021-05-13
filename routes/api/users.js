const express = require('express');

// express.Router class to create modular, mountable route handlers
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// to validate the user input and report any errors before creating the user
const { body, validationResult } = require('express-validator');

// importing our User model
const User = require('../../models/User');

// @route   POST api/users
// @des     Register user
// @access  Public

// in order to use 'req.body' to send data to backend server
// we have to use middleware - bodyParser to our server.js &
// now it's included with express & config setting in server.js
router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring from request body
    const { name, email, password } = req.body;

    try {
      // The find method is used to retrieve data from a MongoDB collection.
      // By default, the find method will return all the documents in a collection.
      // But there is one more method that can be used to retrieve only ONE document in the collection.
      // This is known as the findOne method. It returns the first matching document
      // whether or not if additional queries are given, it will return the very first document on the collection.

      // see if user already exists with an email
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // default size
        r: 'pg', // rating - no naked pic
        d: 'mm', // default image user icon
      });

      // if user doesn't exists, create new user using User modal
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      // before we save it in db, we need to encrypt/hash the password
      // using bcrypt genSalt method to generate a salt to hash the password
      // which returns a promise
      // 10 is default round to determine how secure the salt is
      const salt = await bcrypt.genSalt(10);

      // taking above salt & hashing the password
      // takes in plain user password & above salt
      user.password = await bcrypt.hash(password, salt);

      // to save in db
      await user.save();

      // payload for token
      const payload = {
        user: {
          // mangoose matches the id in mangodb
          id: user.id,
        },
      };

      // to send user token
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '5 days' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
