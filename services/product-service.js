const customError = require("../utils/customError");
const userModel = require("../models/userModel");
const checkAdminService = require("./auth-srtvice");
const productModel = require("../models/productModel");

const findProductById = async (productId) => {
  try {
    // Find the product by productId
    const product = await productModel.findById(productId);

    if (!product) {
      throw customError("Product not found", 404);
    }

    return product;
  } catch (error) {
    throw customError("error find product by id", 400);
  }
};

// validateDataService
const validateDataService = async (userId, productDetail) => {
  // Check if the information is available
  if (!productDetail) {
    throw customError("Please fill in all information.", 400);
  }

  // check login and admin
  checkAdminService(userId);
};

// update productDetail
const updateMultipleProductDetail = async (productId, productDetail) => {
  try {
    // Find the product by productId
    const product = await findProductById(productId);

    // Loop update
    productDetail.forEach((update) => {
      const { productDetailId, updateData } = update;

      // Find the productAccount by productAccountId
      const productAccount = product.productAccount.id(productDetailId);
      if (!productAccount) {
        throw customError(
          `Product account with id ${productDetailId} not found`,
          404
        );
      }

      //  Update productAccount
      Object.keys(updateData).forEach((key) => {
        productAccount[key] = updateData[key];
      });
    });

    await product.save();

    return product;
  } catch (error) {
    throw customError(error.message, error.statusCode);
  }
};

// delete productDetail
const deleteProductDetailService = async (productId, productAccountIds) => {
  try {
    const product = await findProductById(productId);

    // Loop delete
    productAccountIds.forEach((productAccountId) => {
      const productAccount = product.productAccount.id(productAccountId);
      if (!productAccount) {
        throw customError(
          `Product account with id ${productAccountId} not found`,
          404
        );
      }
      product.productAccount.pull({ _id: productAccountId });
    });

    // save updated
    await product.save();

    return product;
  } catch (error) {
    throw customError(error.message, error.statusCode);
  }
};

module.exports = {
  validateDataService,
  updateMultipleProductDetail,
  findProductById,
  deleteProductDetailService,
};
