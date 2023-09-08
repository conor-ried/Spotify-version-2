const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../expressError');
require('dotenv').config();

// Middleware to authenticate users based on JWT
function authenticateUser(req, res, next) {
    try {
      // Extract the JWT token from the request headers or wherever it's stored
      console.log(SECRET_KEY);
      const token = req.headers.authorization.replace('Bearer ', '');
      console.log('Received Token:', token);  // Assuming you send the token in the "Authorization" header
      // Verify the token using your secret key
      const payload = jwt.verify(token, SECRET_KEY);
      console.log(SECRET_KEY);
      // Attach the payload to the request object for later use, e.g., req.user
      req.user = payload;
      return next();
    } catch (err) {
      return next(new UnauthorizedError('Authentication required'));
    }
  }

// Middleware to authorize admin users
function authorizeAdmin(req, res, next) {
  // Check if the authenticated user is an admin
  if (req.user.is_admin) {
    return next();
  } else {
    return next(new ForbiddenError('Admin authorization required'));
  }
}

module.exports = { authenticateUser, authorizeAdmin };