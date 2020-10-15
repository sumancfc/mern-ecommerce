const router = require("express").Router();

const { register, login, getUserProfile } = require("../controllers/user");
const { auth } = require("../middleware/authMiddleware");

router.post("/", register);
router.post("/login", login);
router.get("/profile", auth, getUserProfile);

module.exports = router;
