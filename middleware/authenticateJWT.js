const jwt = require("jsonwebtoken");


exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("Token from header:", token); // Log the token

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // Remove 'Bearer ' prefix if present
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7, token.length)
      : token;
    console.log("Actual token:", actualToken); // Log the actual token

    const verified = jwt.verify(
      actualToken,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    req.user = verified;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message); // Log the error message
    res.status(400).json({ message: "Invalid token" });
  }
};


// Middleware to check role-based permissions for specific entities
exports.checkPermissions = (allowedActions) => {
  return (req, res, next) => {
    const allowedRoles = allowedActions[req.method.toLowerCase()]; // Fetch allowed roles for the requested HTTP method
    if (!allowedRoles) {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // Check if the user's role is allowed to perform the requested action
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Additional check for entity-specific permissions
    if (req.method.toLowerCase() === 'post' && req.body.role) {
      const entityRole = req.body.role;
      const allowedEntityRoles = allowedActions[entityRole];
      if (!allowedEntityRoles || !allowedEntityRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Permission denied to add user with specified role" });
      }
    }

    next();
  };
};

