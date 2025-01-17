import {Router} from 'express';
import {
  createOrder,
  getOrderById,
  orderList,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/order";
import { auth, authAdmin } from "../middleware/authMiddleware";

const router: Router = Router();

router.route("/").post(auth, createOrder).get(auth, authAdmin, getAllOrders);
router.route("/order").get(auth, orderList);
router.route("/:id").get(auth, getOrderById);
router.route("/:id/pay").put(auth, authAdmin, updateOrderToPaid);
router.route("/:id/deliver").put(auth, authAdmin, updateOrderToDelivered);

export default router;
