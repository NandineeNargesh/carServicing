const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    req.is_admin = decoded.is_admin;

    next();
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };