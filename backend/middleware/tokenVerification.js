const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("here is the token extracted from headers", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    const decoded = jwt.verify(token, "outfitter");
    req.user = decoded;
    console.log("here is the request ,BBBBoDDY", req.body);
    next();
  } catch (err) {
    console.log("error in token verification", err);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
module.exports = { verifyToken };
