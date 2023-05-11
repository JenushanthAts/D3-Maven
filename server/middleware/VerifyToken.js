import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next(); //if it is authenticated successful
  } catch (err) {
    res.status(401).send({ message: "Auth failed", error: err.message });
  }
};

export default verifyToken;
