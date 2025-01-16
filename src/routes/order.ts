const router = require("express").Router();

const {
  createOrder,
  getOrderById,
  orderList,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/order");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.route("/").post(auth, createOrder).get(auth, isAdmin, getAllOrders);
router.route("/order").get(auth, orderList);
router.route("/:id").get(auth, getOrderById);
router.route("/:id/pay").put(auth, isAdmin, updateOrderToPaid);
router.route("/:id/deliver").put(auth, isAdmin, updateOrderToDelivered);

module.exports = router;
