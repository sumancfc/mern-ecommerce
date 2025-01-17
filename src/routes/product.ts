import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  // bestProducts
} from "../controllers/product";
import { auth, authAdmin } from "../middleware/authMiddleware";

const router: Router = Router();

router.route("/").get(getProducts).post(auth, authAdmin, createProduct);
router.route("/:id/review").post(auth, reviewProduct);
// router.route("/best").get(bestProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(auth, authAdmin, updateProduct)
  .delete(auth, authAdmin, deleteProduct);

export default router;
