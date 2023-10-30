const crypto = require('crypto');
const newSecretKey = crypto.randomBytes(32).toString('hex');
console.log('New JWT Secret Key:', newSecretKey);