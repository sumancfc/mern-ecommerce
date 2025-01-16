import { Router } from "express";

const {
  register,
  login,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { auth, isAdmin } = require("../middleware/authMiddleware");

const router: Router = Router();

router.route("/").post(register).get(auth, isAdmin, getAllUsers);
router.post("/login", login);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);
router
  .route("/:id")
  .get(auth, isAdmin, getUserById)
  .put(auth, isAdmin, updateUser)
  .delete(auth, isAdmin, deleteUser);

export default router;
