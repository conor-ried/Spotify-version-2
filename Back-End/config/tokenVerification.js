const jwt = require('jsonwebtoken');

// Your JWT_SECRET should be loaded from the environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// Your token, replace with your actual token
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXNzc3Nzc3MiLCJpYXQiOjE2OTQyNjYwNTJ9.2AIAWtOcNC1BJmjHBBuwQG1RVCrEWtwQjZ17EtVSXME'; // Replace with your token

try {
  // Verify and decode the token
  console.log('JWT_SECRET:', JWT_SECRET);
console.log('Token:', token);
  const decodedToken = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

  // Check if the necessary fields exist 
  if (!decodedToken.username || !decodedToken.is_admin) {
    throw new Error('Token payload is missing required fields');
  }

  console.log('Token payload:', decodedToken);
} catch (err) {
  console.error('Token verification error:', err.message);
}