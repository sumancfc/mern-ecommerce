const router = require("express").Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(auth, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(auth, isAdmin, updateProduct)
  .delete(auth, isAdmin, deleteProduct);

module.exports = router;
