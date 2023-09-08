// generateTokens.js

const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

function generateToken(userId, username, isAdmin) {
  const payload = {
    user_id: userId,
    username: username,
    is_admin: isAdmin,
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h', // Token expiration time (e.g., 1 hour)
  });

  return token;
}

// Generate tokens for users and admin
const userToken1 = generateToken(1, 'user1', false);
const userToken2 = generateToken(2, 'user2', false);
const adminToken1 = generateToken(3, 'admin', true);
const adminToken2 = generateToken(4, 'Pluto', true);

console.log('User Token 1:', userToken1);
console.log('User Token 2:', userToken2);
console.log('Admin Token 1:', adminToken1);
console.log('Admin Token 2:', adminToken2);