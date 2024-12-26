const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const cloudinary = require("../utils/cloudinary");
const customError = require("../utils/customError");

const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      subDescription,
      description,
      originalPrice,
      price,
      quantity,
    } = req.body;
    const file = req.file;
    const userId = req.user;

    // Check data
    if (!title || !price || !quantity) {
      throw customError("Please fill in all information.", 400);
    }

    //   check login
    if (!userId) {
      throw customError("Please login.", 400);
    }

    let image = "";
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "app-premium",
        use_filename: true,
        unique_filename: true,
      });
      image = result.secure_url;
    }

    //   createProduct
    const product = await productModel.create({
      userId: userId,
      title,
      subDescription,
      description,
      originalPrice: Number(originalPrice),
      price: Number(price),
      image,
      quantity: Number(quantity),
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});

    if (!products) {
      throw customError("Product not found.", 404);
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const products = await productModel.findById(req.params.id);

    if (!products) {
      throw customError("Product not found.", 404);
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const {
      title,
      subDescription,
      description,
      originalPrice,
      price,
      quantity,
    } = req.body;
    const file = req.file;
    const id = req.params.id;

    console.log("title = ", title);

    //check product exits
    product = await productModel.findById(id);
    if (!product) {
      throw customError("Product not found.", 404);
    }

    // check auth
    if (String(product.userId) !== req.user) {
      throw customError("Product not authorized.", 401);
    }

    let image = null;
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "app-premium",
        use_filename: true,
        unique_filename: true,
      });
      image = result.secure_url;
    }

    const updateProduct = await productModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        subDescription,
        description,
        originalPrice: Number(originalPrice),
        price: Number(price),
        image: image ? image : product.image,
        quantity: Number(quantity),
      },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    //check product exits
    product = await productModel.findById(id);
    if (!product) {
      throw customError("Product not found.", 404);
    }

    // check auth
    if (String(product.userId) !== req.user) {
      throw customError("Product not authorized.", 401);
    }

    // delete product
    await productModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Product delete." });
  } catch (error) {
    next(err);
    console.log(err);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { productDetail } = req.body;
    const userId = req.user;
    const productId = req.params.id;

    // Check data
    if (!productDetail) {
      throw customError("Please fill in all information.", 400);
    }

    //   check login
    if (!userId) {
      throw customError("Please login.", 400);
    }

    // check admin
    const admin = await userModel.findById(userId).select("-password");
    if (!admin || admin.role !== "admin") {
      throw customError("No admin rights to access the api.", 400);
    }

    // Add product detail
    const product = await productModel.findById(productId);
    if (!product) {
      throw customError("Product not found.", 404);
    }

    product.productAccount.push({
      productDetail,
      createDate: new Date(),
      status: "sell",
    });
    await product.save();

    res.status(200).json(product);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
};
