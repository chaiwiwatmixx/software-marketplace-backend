const customError = require("../utils/customError");
const userModel = require("../models/userModel");

const checkAdminService = async (userId) => {
  try {
    const admin = await userModel.findById(userId).select("-password");

    if (!admin || admin.role !== "admin") {
      throw customError("No admin rights to access the api.", 400);
    }
  } catch (error) {
    throw customError(
      "There was an error finding the admin in the system.",
      400
    );
  }
};

module.exports = checkAdminService;
