// creating the router component
import { Router } from "express";

// import the controllers
import {
  GetUser,
  handelDeleteUser,
  handelFollowUser,
  handelUnFollowUser,
  handelUpdateUser,
} from "../controllers/user.controllers.js";

// craeting the router element
const router = Router();

// Update user
router.put("/:id", handelUpdateUser);

// delete user
router.delete("/:id", handelDeleteUser);

// get a user
router.get("/:id", GetUser);

// follow user (it will be update request)
router.put("/:id/follow", handelFollowUser);

// unfollow user
router.put("/:id/unfollow", handelUnFollowUser);

// exporting the router component
export default router;
