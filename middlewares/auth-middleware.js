const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    // get token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw customError("No token, authorization denied.", 401);
    }
    const token = authHeader.split(" ")[1];

    // verify
    const decoded = jwt.verify(token, process.env.secretKey);

    // find id from token in db
    const user = await userModel.findById(decoded.userId);
    // const user = await userModel.findById({
    //   where: {
    //     id: parseInt(decoded.userId),
    //   },
    // });

    if (!user) {
      throw customError("User not found", 404);
    }

    req.user = user.id;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authMiddleware;
