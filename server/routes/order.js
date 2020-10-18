const router = require("express").Router();

const {
  createOrder,
  getOrderById,
  updateOrder,
  orderList,
} = require("../controllers/order");
const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, createOrder);
router.get("/order", auth, orderList);
router.get("/:id", auth, getOrderById);

router.put("/:id/pay", auth, updateOrder);

module.exports = router;
