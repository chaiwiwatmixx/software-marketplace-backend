const customError = require("../utils/customError");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { username, password, password2, email } = req.body;

    // Check data accuracy
    if (!username || !password || !password2 || !email) {
      res.status(400);
      return customError("Please fill in all information", 400);
    }

    // check already email
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return customError("already have this email", 400);
    }

    // Check password
    if (password != password2) {
      return customError("Password do not match", 400);
    }

    //password > 6
    if (password.length <= 5) {
      return customError("Password must be longer than 6 characters", 400);
    }

    // hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    //create User
    const createUser = await User.create({
      username,
      email,
      password: hashPassword,
      role: "sale",
    });
    if (!createUser) {
      return customError("Failed to create user", 404);
    }

    res.status(200).json(createUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return customError("Please fill in all information.", 400);
    }

    // check email
    const checkEmail = await User.findOne({ email: email });
    if (!checkEmail) {
      return customError("Email not found.", 400);
    }

    // compare password
    const checkPassword = await bcrypt.compare(password, checkEmail.password);

    if (checkPassword) {
      // delete password
      const { _id, username, email, role } = checkEmail;

      //jwt sign
      const token = await jwt.sign({ userId: _id }, process.env.secretKey, {
        expiresIn: "1d",
        algorithm: "HS256",
      });

      res.status(200).json({ _id, username, email, role, token });
    } else {
      return customError("Password is incorrect.", 400);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const userId = req.user;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    return customError("user not found please log in.", 400);
  }

  res.status(200).json(user);
};

module.exports = {
  register,
  login,
  getUser,
};
