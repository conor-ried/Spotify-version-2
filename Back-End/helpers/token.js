const jwt = require("jsonwebtoken");
const config = require('config');

/** return signed JWT from user data. */

function createToken(user) {
//   console.assert(user.isAdmin !== undefined,
//       "createToken passed user without isAdmin property");

  let payload = {
    username: user.username,

  };
  const secretKey = process.env.JWT_SECRET

  return jwt.sign(payload, secretKey);
}

module.exports = { createToken };
