const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("✅ Token decoded:", decoded);
      next();
    } catch (err) {
      console.error("❌ Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    console.warn("❌ No token provided or format incorrect");
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = verifyToken;
