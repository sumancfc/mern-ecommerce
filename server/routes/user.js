const router = require("express").Router();

const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user");
const { auth } = require("../middleware/authMiddleware");

router.post("/", register);
router.post("/login", login);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);

module.exports = router;
