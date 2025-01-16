const router = require("express").Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  // bestProducts
} = require("../controllers/product");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(auth, isAdmin, createProduct);
router.route("/:id/review").post(auth, reviewProduct);
// router.route("/best").get(bestProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(auth, isAdmin, updateProduct)
  .delete(auth, isAdmin, deleteProduct);

module.exports = router;
