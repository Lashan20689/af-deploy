// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "supersecretkey";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if the authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Forbidden: No token provided or token malformed" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Store the decoded user data in the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = { authenticateToken };
