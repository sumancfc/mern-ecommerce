import { Router } from "express";
import {
  register,
  login,
  getAllUsers,
  getUserProfile,
  getUserById,
  updateUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/user";
import { auth, authAdmin } from "../middleware/authMiddleware";

const router: Router = Router();

router.route("/").post(register).get(auth, authAdmin, getAllUsers);
router.post("/login", login);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);
router
  .route("/:id")
  .get(auth, authAdmin, getUserById)
  .put(auth, authAdmin, updateUser)
  .delete(auth, authAdmin, deleteUser);

export default router;
