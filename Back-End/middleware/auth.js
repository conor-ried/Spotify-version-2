const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require('../expressError');

const SECRET_KEY = process.env.JWT_SECRET || "development-secret-key";  // Fallback for development purposes

function authenticateJWT(req, res, next) {
    try {
        console.log(req.headers);

        const authHeader = req.headers.authorization;
        console.log("Line 9 auth.js Signing token with key:", SECRET_KEY);
        console.log("Line 10 Entire Authorization header:", authHeader);

        if (authHeader) {
            // Enhanced token extraction logic
            const tokenParts = authHeader.split(' ');
            if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
                throw new UnauthorizedError("Invalid Authorization header format");
            }
            const token = tokenParts[1];
            console.log('auth.js logging line13', token);
            
            try {
                const payload = jwt.verify(token, SECRET_KEY);
                req.user = payload;
                return next();
            } catch (jwtError) {
                // Log specific JWT error
                console.error("JWT verification error:", jwtError.message);
                throw new UnauthorizedError("Invalid token");
            }
        }

        throw new UnauthorizedError("No token provided");
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    authenticateJWT
};