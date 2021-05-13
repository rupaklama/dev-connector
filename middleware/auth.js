const jwt = require('jsonwebtoken');
const config = require('config');

// middleware has an access to request & response cycle
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token'); // key/value - token's key

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token

  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        // setting user in that decoded token for authenticated routes
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
