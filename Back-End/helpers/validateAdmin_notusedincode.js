const jwt = require('jsonwebtoken');

// Your token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY5NDAwNjQzNSwiZXhwIjoxNjk0MDEwMDM1fQ.z8Ew9R_LxjJoZqPD7UCs7lLmEt2xmVmYWKAgmsABCQM';

// Verify and decode the token
jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
  if (err) {
    // Token is invalid
    console.error('Token verification failed:', err);
  } else {
    // Token is valid, inspect the payload
    console.log('Decoded Token Payload:', decoded);
    if (decoded.is_admin) {
      // User is an admin
      console.log('User is an admin.');
    } else {
      // User is not an admin
      console.log('User is not an admin.');
    }
  }
});