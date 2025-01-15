const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  updateProductDetail,
  deleteProductDetail,
} = require("../controllers/product-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", authMiddleware, upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/add/:id", authMiddleware, addProduct);
router.put("/detail/:id", authMiddleware, updateProductDetail);
router.delete("/detail/:id", authMiddleware, deleteProductDetail);

module.exports = router;

// swagger docs api
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - price
 *         - quantity
 *       properties:
 *         userId:
 *           type: string
 *           description: The user ID
 *         title:
 *           type: string
 *           description: The product title
 *         subDescription:
 *           type: string
 *           description: The product sub-description
 *         description:
 *           type: string
 *           description: The product description
 *         originalPrice:
 *           type: number
 *           description: The original price of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         image:
 *           type: string
 *           description: The URL of the product image
 *         quantity:
 *           type: number
 *           description: The quantity of the product
 *         productAccount:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productDetail:
 *                 type: string
 *                 description: The product detail
 *               createDate:
 *                 type: string
 *                 format: date-time
 *                 description: The creation date of the product
 *               status:
 *                 type: string
 *                 description: The status of the product
 *                 enum: [sell, sold, problem]
 *       example:
 *         userId: "60d0fe4f5311236168a109ca"
 *         title: "Sample Product"
 *         subDescription: "This is a sample product"
 *         description: "Detailed description of the sample product"
 *         originalPrice: 100
 *         price: 80
 *         image: "http://example.com/image.jpg"
 *         quantity: 10
 *         productAccount:
 *           - productDetail: "Detail 1"
 *             createDate: "2023-10-01T00:00:00Z"
 *             status: "sell"
 *           - productDetail: "Detail 2"
 *             createDate: "2023-10-02T00:00:00Z"
 *             status: "sold"
 */
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               originalPrice:
 *                 type: number
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Products not found
 */
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               originalPrice:
 *                 type: number
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /products/add/{id}:
 *   put:
 *     summary: Add multiple product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productDetails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of product details to add
 *             example:
 *               productDetails: ["Detail 1", "Detail 2", "Detail 3"]
 *     responses:
 *       200:
 *         description: Product details added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request or invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /products/detail/{id}:
 *   put:
 *     summary: Update product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productDetail:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productDetailId:
 *                       type: string
 *                       description: The product detail ID
 *                     updateData:
 *                       type: object
 *                       properties:
 *                         productDetail:
 *                           type: string
 *                         createDate:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                           enum: [sell, sold, problem]
 *     responses:
 *       200:
 *         description: Product detail updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /products/detail/{id}:
 *   delete:
 *     summary: Delete product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productAccountIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of product account IDs to be deleted
 *     responses:
 *       200:
 *         description: Product detail deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
