const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Replace with your actual secret key

function generateAdminToken() {
  const payload = {
    user_id: 3, // Replace with the admin's user ID
    username: 'admin', // Replace with the admin's username
    is_admin: true, // Indicate that this user is an admin
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h', // Token expiration time (e.g., 1 hour)
  });

  return token;
}

