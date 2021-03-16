const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

// to validate the user input and report any errors before creating the user
const { body, validationResult } = require('express-validator');

// importing our User model
const User = require('../../models/User');

// @route   GET api/users
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
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // The find method is used to retrieve data from a MongoDB collection.
      // By default, the find method will return all the documents in a collection.
      // But there is one more method that can be used to retrieve only ONE document in the collection.
      // This is known as the findOne method. It returns the first matching document
      // whether or not if additional queries are given, it will return the very first document on the collection.

      // see if user exists with an email
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get users gravatar
      // Encrypt password
      // return jsonwebtoken
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
